import { motion } from 'framer-motion';
import {
  BookOpen, Stethoscope, Car, Clock, Scale, Plane,
  Package, Baby, LayoutGrid,
} from 'lucide-react';
import GuideSection from '../components/GuideSection';

export default function GuidesPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-forest-100">
              <BookOpen className="h-6 w-6 text-forest-600" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-800">
              Dog Travel Tips & Guides
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">
            Practical advice for traveling with your dog — from vet prep to car safety,
            airline policies, and tips for families traveling with kids and dogs together.
          </p>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <GuideSection icon={Stethoscope} title="Vet Prep & Health Certificates" color="bg-red-100 text-red-600" defaultOpen>
            <p>Before hitting the road, make sure your pup is road-trip ready:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Visit your vet 2-4 weeks before departure.</strong> Get a wellness check, update vaccinations, and request a health certificate if crossing state lines.</li>
              <li><strong>Bring copies of vaccination records.</strong> Rabies certificates are required in all 50 states. Some states require additional vaccinations.</li>
              <li><strong>Ask about travel anxiety medication.</strong> If your dog gets anxious in the car, your vet may recommend calming aids or anti-nausea meds.</li>
              <li><strong>Microchip your dog</strong> and ensure the contact info is up to date. If your dog gets lost in an unfamiliar city, this is your best recovery tool.</li>
              <li><strong>Pack a first-aid kit</strong> with gauze, antiseptic wipes, tweezers (for ticks), Benadryl (vet-approved dose), and any prescription medications.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GuideSection icon={Car} title="Car Safety & Restraints" color="bg-blue-100 text-blue-600">
            <p>A safe dog is a happy traveler. Never let your dog ride unrestrained.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Use a crash-tested harness</strong> that clips into the seatbelt. Look for brands with CPS (Center for Pet Safety) certification.</li>
              <li><strong>Crates are the gold standard</strong> — a secured crate in the cargo area prevents injury during sudden stops and gives your dog a familiar "den."</li>
              <li><strong>Never let dogs ride in the front seat.</strong> Airbag deployment can be fatal. The back seat or cargo area is safest.</li>
              <li><strong>Crack windows slightly</strong> for ventilation but never enough for your dog to jump out. Use window guards for determined pups.</li>
              <li><strong>Never leave your dog in a parked car.</strong> Even on a 70°F day, interior temps can reach 115°F in 30 minutes.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GuideSection icon={Clock} title="Rest Stop Frequency & Exercise" color="bg-amber-100 text-amber-600">
            <p>Plan regular breaks to keep your dog comfortable and happy:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Stop every 2-3 hours</strong> for bathroom breaks, water, and a short walk. Puppies and senior dogs may need more frequent stops.</li>
              <li><strong>Bring a collapsible water bowl</strong> and fresh water. Rest stop water sources may not be clean.</li>
              <li><strong>Always leash at rest stops.</strong> Unfamiliar locations and highway noise can spook even the calmest dogs.</li>
              <li><strong>Plan lunch stops at dog-friendly restaurants</strong> with outdoor patios — our city guides flag these for you!</li>
              <li><strong>Stretch your dog's legs</strong> with a 10-15 minute walk at each stop. This prevents stiffness and reduces anxiety.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GuideSection icon={Scale} title="State Regulations & Requirements" color="bg-purple-100 text-purple-600">
            <p>Dog travel regulations vary by state. Here's what to know:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Health certificates:</strong> Most states require a Certificate of Veterinary Inspection (CVI) issued within 10-30 days of travel for interstate transport.</li>
              <li><strong>Rabies requirements:</strong> Universal across all states, but some require the certificate to show the vaccination was administered by a licensed vet.</li>
              <li><strong>Breed-specific legislation:</strong> Some cities have restrictions on certain breeds. Research your destination — Denver, Miami-Dade, and others have notable breed-specific laws.</li>
              <li><strong>Leash laws:</strong> Most cities require dogs to be leashed in public. Off-leash is typically restricted to designated dog parks.</li>
              <li><strong>Hotel pet deposits:</strong> Some states limit the amount hotels can charge as a pet deposit. Always confirm policies before booking.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GuideSection icon={Plane} title="Airline Policies for Dog Travel" color="bg-sky-100 text-sky-600">
            <p>Flying with your dog? Every airline has different rules:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>In-cabin:</strong> Most airlines allow small dogs (under 20 lbs including carrier) in-cabin for $75-$200 each way. Book early — spots are limited per flight.</li>
              <li><strong>Cargo:</strong> Larger dogs must fly as checked baggage or cargo. Avoid flying pets in extreme heat or cold. Many airlines embargo pet cargo in summer months.</li>
              <li><strong>Required documents:</strong> Airlines typically require a health certificate issued within 10 days and proof of rabies vaccination.</li>
              <li><strong>Carrier requirements:</strong> Must fit under the seat in front of you. Measure carefully — airlines are strict about dimensions.</li>
              <li><strong>Alternatives to flying:</strong> For road trips, driving is often less stressful for dogs and gives you full control over breaks and comfort.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <GuideSection icon={Package} title="Dog Packing Essentials" color="bg-forest-100 text-forest-600">
            <p>Don't leave home without these essentials for your pup:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Must-Haves</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Food & treats (pre-portioned for each day)</li>
                  <li>Collapsible water bowl</li>
                  <li>Leash & harness + spare</li>
                  <li>Waste bags (more than you think)</li>
                  <li>Vaccination records & health certificate</li>
                  <li>Medications</li>
                  <li>ID tags with your phone number</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Nice-to-Haves</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Favorite blanket or bed</li>
                  <li>Chew toys for the car</li>
                  <li>Calming spray or treats</li>
                  <li>Portable crate or pen</li>
                  <li>Dog-safe sunscreen (for light-colored dogs)</li>
                  <li>Paw balm for hot pavement</li>
                  <li>Lint roller (for the hotel room)</li>
                </ul>
              </div>
            </div>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GuideSection icon={Baby} title="Traveling with Kids + Dogs" color="bg-pink-100 text-pink-600">
            <p>Family road trips with kids and dogs are an adventure — here's how to make them smooth:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Assign "zones" in the car.</strong> Kids in the middle row, dog in the back (crated or harnessed). This prevents over-excited interactions during driving.</li>
              <li><strong>Sync break schedules.</strong> Kids and dogs both need bathroom and stretch breaks every 2 hours. Align them to save time.</li>
              <li><strong>Pack kid snacks and dog treats separately</strong> — and clearly label them! Many human foods are toxic to dogs (chocolate, grapes, xylitol).</li>
              <li><strong>Teach kids rest-stop rules:</strong> hold the dog's leash firmly, stay away from the road, and never approach other dogs without asking.</li>
              <li><strong>Choose family + pet friendly accommodations.</strong> Look for hotels with grassy areas, and ensure cribs/rollaway beds don't crowd the dog's space.</li>
              <li><strong>Plan activities for everyone.</strong> Dog-friendly beaches, nature trails, and parks where kids can run and dogs can explore together.</li>
            </ul>

            <h4 className="font-semibold text-slate-700 mt-4">Age-Specific Tips</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Infants (0-1):</strong> Keep the dog separate from the car seat area. Never leave baby and dog unattended together. Bring a portable playpen to create a safe zone at rest stops.</li>
              <li><strong>Toddlers (1-3):</strong> Teach gentle touching early. Toddlers can help fill the dog's water bowl at stops — it builds the human-animal bond. Keep leash length short near toddlers.</li>
              <li><strong>School-age (4-10):</strong> Assign "dog duties" — carrying the waste bag holder, holding the leash (with adult backup), or tracking water breaks. Kids love responsibility!</li>
              <li><strong>Tweens/Teens (11+):</strong> They can be genuine co-pilots. Let them research dog-friendly restaurants, manage the dog at rest stops, and help navigate to the next city.</li>
            </ul>

            <h4 className="font-semibold text-slate-700 mt-4">Keeping the Peace</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Bring a frozen Kong or lick mat</strong> for the dog during long highway stretches — it keeps them occupied while kids watch a movie or nap.</li>
              <li><strong>Rotate car entertainment:</strong> audiobooks the whole family (and dog!) can enjoy, car games, and quiet individual activities.</li>
              <li><strong>Have a meltdown plan.</strong> If a kid or dog gets overwhelmed, pull over at the next safe spot. A 10-minute walk fixes most moods for both species.</li>
            </ul>
          </GuideSection>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GuideSection icon={LayoutGrid} title="Car Space Planning (Crates + Car Seats)" color="bg-orange-100 text-orange-600">
            <p>Fitting car seats, crates, luggage, and travel gear takes Tetris-level planning:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Measure your cargo space first.</strong> Know the dimensions of your dog's crate and car seats before committing to a vehicle configuration.</li>
              <li><strong>SUVs and minivans are your friend.</strong> Third-row seating folded flat gives room for a large crate plus luggage.</li>
              <li><strong>Use a cargo barrier</strong> between the back seat and the cargo area if your dog rides without a crate. This protects both kids and dog during sudden stops.</li>
              <li><strong>Roof cargo boxes</strong> free up interior space for essentials. Put luggage on top, keep dog gear and kid gear within arm's reach.</li>
              <li><strong>Pack a "quick access" bag</strong> with diapers, dog waste bags, water, snacks, and wipes right behind the driver's seat for rest-stop efficiency.</li>
            </ul>

            <h4 className="font-semibold text-slate-700 mt-4">Vehicle Layout by Family Size</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-sand-50 rounded-lg p-3">
                <h5 className="font-medium text-slate-700 text-sm mb-1">Sedan (2 adults + small dog)</h5>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>Dog in back seat with crash-tested harness</li>
                  <li>Trunk: luggage + portable crate for hotel</li>
                  <li>Backseat organizer for dog supplies</li>
                </ul>
              </div>
              <div className="bg-sand-50 rounded-lg p-3">
                <h5 className="font-medium text-slate-700 text-sm mb-1">SUV (2 adults + 1 kid + dog)</h5>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>Car seat behind passenger, dog behind driver</li>
                  <li>Cargo: crate secured against back seats</li>
                  <li>Center console: snacks, water, wipes</li>
                </ul>
              </div>
              <div className="bg-sand-50 rounded-lg p-3">
                <h5 className="font-medium text-slate-700 text-sm mb-1">Minivan (2 adults + 2-3 kids + dog)</h5>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>Kids in middle row (captain's chairs or bench)</li>
                  <li>Dog in cargo with secured crate</li>
                  <li>Roof box for luggage; keep cabin for essentials</li>
                </ul>
              </div>
              <div className="bg-sand-50 rounded-lg p-3">
                <h5 className="font-medium text-slate-700 text-sm mb-1">Large SUV (full family + large dog)</h5>
                <ul className="list-disc pl-4 text-sm space-y-1">
                  <li>Third row folded flat for XL crate</li>
                  <li>All kids in second row</li>
                  <li>Hitch-mounted cargo carrier for overflow</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-slate-700 mt-4">Pro Tips</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Do a test pack</strong> a week before the trip. Load everything into the car to verify it all fits with room to spare.</li>
              <li><strong>Use packing cubes</strong> for both kid and dog gear — color-code them so anyone can grab the right bag at a rest stop.</li>
              <li><strong>Keep a "car emergency kit"</strong> accessible: paper towels, trash bags, stain remover, and a change of clothes for the youngest human and the furriest passenger.</li>
            </ul>
          </GuideSection>
        </motion.div>
      </div>
    </div>
  );
}
