import { getAllAnimals } from "../../../../../webapp/server/mongodb/actions/animalActions.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const animals = await getAllAnimals();
    return NextResponse.json(animals, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
