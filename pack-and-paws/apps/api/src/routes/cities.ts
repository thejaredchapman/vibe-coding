import { Router } from 'express';
import {
  listCities,
  getCityDetail,
  getCityHotels,
  getCityParks,
  getCityRestaurants,
  getCityCafes,
  getCityDogParks,
} from '../controllers/cities';

const router = Router();

router.get('/', listCities);
router.get('/:id', getCityDetail);
router.get('/:id/hotels', getCityHotels);
router.get('/:id/parks', getCityParks);
router.get('/:id/restaurants', getCityRestaurants);
router.get('/:id/cafes', getCityCafes);
router.get('/:id/dog-parks', getCityDogParks);

export default router;
