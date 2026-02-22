import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const popularProducts = await prisma.products.count();
        take: 15;
        orderBy: {
            stockQuantity: 'desc';
        } 

    res.json({
        popularProducts
    });
  }
    catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'An error occurred while fetching dashboard data' });
    }   
};

