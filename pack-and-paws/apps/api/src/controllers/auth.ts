import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { registerSchema, loginSchema, refreshSchema, inviteSchema } from '../lib/validation';
import { AppError } from '../middleware/errorHandler';
import { AuthPayload } from '../middleware/auth';

const SALT_ROUNDS = 12;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

function generateTokens(payload: AuthPayload) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
}

export async function register(req: Request, res: Response) {
  const { email, password, name } = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, 'EMAIL_EXISTS', 'An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create household + user together
  const household = await prisma.household.create({
    data: { name: `${name}'s Pack` },
  });

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      householdId: household.id,
    },
  });

  const tokens = generateTokens({ userId: user.id, email: user.email });

  res.status(201).json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        householdId: user.householdId,
      },
      ...tokens,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const tokens = generateTokens({ userId: user.id, email: user.email });

  res.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        householdId: user.householdId,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    },
  });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = refreshSchema.parse(req.body);

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as AuthPayload;

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      throw new AppError(401, 'USER_NOT_FOUND', 'User no longer exists');
    }

    const tokens = generateTokens({ userId: user.id, email: user.email });

    res.json({ data: tokens });
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid or expired');
  }
}

export async function inviteToHousehold(req: Request, res: Response) {
  const { email } = inviteSchema.parse(req.body);
  const userId = req.user!.userId;

  const inviter = await prisma.user.findUnique({ where: { id: userId } });
  if (!inviter?.householdId) {
    throw new AppError(400, 'NO_HOUSEHOLD', 'You must be part of a household to invite');
  }

  const invitee = await prisma.user.findUnique({ where: { email } });
  if (!invitee) {
    throw new AppError(404, 'USER_NOT_FOUND', 'No user found with that email');
  }

  if (invitee.householdId === inviter.householdId) {
    throw new AppError(400, 'ALREADY_IN_HOUSEHOLD', 'This user is already in your household');
  }

  await prisma.user.update({
    where: { id: invitee.id },
    data: { householdId: inviter.householdId },
  });

  res.json({
    data: { message: `${invitee.name} has been added to your household!` },
  });
}
