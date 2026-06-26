import { getHealthFeedback, getOptimizedPlate, BANGLADESHI_FOOD_DB } from '@/lib/food-db';

describe('Food Database Algorithms', () => {
  describe('getHealthFeedback', () => {
    it('should return excellent for a balanced plate', () => {
      const items = [
        { foodId: 'rice', quantity: 1 },
        { foodId: 'rui_mach', quantity: 1 },
        { foodId: 'lal_shak', quantity: 1 }
      ];
      
      const feedback = getHealthFeedback(items, 'general', BANGLADESHI_FOOD_DB);
      
      expect(feedback.status).toBe('excellent');
      expect(feedback.message).toContain('Excellent plate balance');
    });

    it('should warn diabetic profile about high GI foods', () => {
      const items = [
        { foodId: 'rice', quantity: 1 }, // High GI
        { foodId: 'rui_mach', quantity: 1 }
      ];
      
      const feedback = getHealthFeedback(items, 'diabetic', BANGLADESHI_FOOD_DB);
      
      expect(feedback.status).toBe('warning');
      expect(feedback.message).toContain('High Glycemic Load');
    });

    it('should warn child profile about low protein', () => {
      const items = [
        { foodId: 'rice', quantity: 1 },
        { foodId: 'lal_shak', quantity: 1 }
      ];
      
      const feedback = getHealthFeedback(items, 'child', BANGLADESHI_FOOD_DB);
      
      expect(feedback.status).toBe('warning');
      expect(feedback.message).toContain('Needs more protein');
    });
  });

  describe('getOptimizedPlate', () => {
    it('should reduce staple portions for diabetic profile if carbs are high', () => {
      const items = [
        { foodId: 'rice', quantity: 3 }, // 3 portions is very high carbs
        { foodId: 'rui_mach', quantity: 1 },
        { foodId: 'lal_shak', quantity: 1 }
      ];

      const optimized = getOptimizedPlate(items, 'diabetic', BANGLADESHI_FOOD_DB);
      
      const optimizedRice = optimized.find(i => i.foodId === 'rice');
      expect(optimizedRice).toBeDefined();
      expect(optimizedRice!.quantity).toBeLessThan(3);
    });

    it('should increase protein portions for child profile if protein is low', () => {
      const items = [
        { foodId: 'rice', quantity: 1 },
        { foodId: 'rui_mach', quantity: 0.5 }, // Low protein
        { foodId: 'lal_shak', quantity: 1 }
      ];

      const optimized = getOptimizedPlate(items, 'child', BANGLADESHI_FOOD_DB);
      
      const optimizedRui = optimized.find(i => i.foodId === 'rui_mach');
      expect(optimizedRui).toBeDefined();
      expect(optimizedRui!.quantity).toBeGreaterThan(0.5);
    });
  });
});
