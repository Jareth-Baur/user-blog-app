// app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Category } from '../../types';

let categories: Category[] = [];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newCategory: Category = {
    id: Date.now().toString(),
    ...body,
  };
  categories.push(newCategory);
  return NextResponse.json(newCategory);
}
