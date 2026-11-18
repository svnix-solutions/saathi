import type { PageMap } from '../../navigation';
import { RatingsPage } from './pages/RatingsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';

/**
 * Quality feature — public API of this folder. Other features import only from here.
 * Pages: ratings, testimonials
 */
export const pages: PageMap = {
  ratings: { section: 'ratings', title: 'Ratings', component: RatingsPage },
  testimonials: { section: 'support', title: 'Testimonials', component: TestimonialsPage },
};

export { RatingsPage, TestimonialsPage };
