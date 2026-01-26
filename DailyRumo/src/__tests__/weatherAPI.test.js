import { describe, it, expect, vi } from 'vitest';
import { getWeatherByCity } from '@/services/weatherService';

describe('WeatherService', () => {
    it('deve processar os dados meteorológicos corretamente', async () => {
      // Simulamos a resposta da API OpenWeather
      const mockData = { name: 'Porto', main: { temp: 20 }, weather: [{ icon: '01d' }] };
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
  
      const data = await getWeatherByCity('Porto');
      expect(data.name).toBe('Porto');
      expect(data.main.temp).toBe(20);
    });
  });