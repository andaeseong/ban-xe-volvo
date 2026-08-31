import { MetadataRoute } from 'next';
import { volvoCars } from '@/lib/cars';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://volvocars.vn';
  const currentDate = new Date();
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/safety`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: currentDate,
      changeFrequency: 'always',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: currentDate,
      changeFrequency: 'always',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/test-drive`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/payment-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
  
  const carRoutes = volvoCars.map(car => ({
    url: `${baseUrl}/cars/${car.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: car.isNew ? 0.9 : car.isPopular ? 0.85 : 0.8,
  }));
  
  const categoryRoutes = [
    'electric', 'suv', 'sedan', 'wagon', 'hybrid'
  ].map(category => ({
    url: `${baseUrl}/cars?category=${category}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));
  
  const yearRoutes = [...new Set(volvoCars.map(c => c.year))].sort((a, b) => b - a).map(year => ({
    url: `${baseUrl}/cars?year=${year}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  
  return [...staticRoutes, ...carRoutes, ...categoryRoutes, ...yearRoutes];
}