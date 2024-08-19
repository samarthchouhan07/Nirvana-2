import Abu_dhabi from "../../../../../public/AbuDhabi.jpg";
import Dubai from "../../../../../public/dubai.jpg";
import Berlin from "../../../../../public/berlin.jpg";
import Hamburg from "../../../../../public/Hamburg.jpg";
import Paris from "../../../../../public/paris.jpg";
import St_tropez from "../../../../../public/StTropez.jpg";
import Mumbai from "../../../../../public/Mumbai.jpg";
import Delhi from "../../../../../public/delhi.jpg";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const abudhabi_listings = await db.listing.count({
      where: {
        location: "abu-dhabi",
      },
    });
    const dubai_listings = await db.listing.count({
      where: {
        location: "dubai",
      },
    });
    const mumbai_listings = await db.listing.count({
      where: {
        location: "mumbai",
      },
    });
    const delhi_listings = await db.listing.count({
      where: {
        location: "delhi",
      },
    });
    const berlin_listings = await db.listing.count({
      where: {
        location: "berlin",
      },
    });
    const hamnurg_listings = await db.listing.count({
      where: {
        location: "hamburg",
      },
    });
    const st_tropez_listings = await db.listing.count({
      where: {
        location: "st-tropez",
      },
    });
    const paris_listings = await db.listing.count({
      where: {
        location: "paris",
      },
    });
    const results = [
      {
        numOfPlaces: abudhabi_listings,
        image: Abu_dhabi,
        value: "abu-dhabi",
      },
      {
        numOfPlaces: dubai_listings,
        image: Abu_dhabi,
        value: "abu-dhabi",
      },
      {
        numOfPlaces: mumbai_listings,
        image: Mumbai,
        value: "mumbai",
      },
      {
        numOfPlaces: delhi_listings,
        image: Delhi,
        value: "delhi",
      },
      {
        numOfPlaces: berlin_listings,
        image: Berlin,
        value: "berlin",
      },
      {
        numOfPlaces: hamnurg_listings,
        image: Hamburg,
        value: "hamburg",
      },
      {
        numOfPlaces: st_tropez_listings,
        image: St_tropez,
        value: "st-tropez",
      },
      {
        numOfPlaces: paris_listings,
        image: Paris,
        value: "paris",
      },
    ];
    const sortedResults = results
      .sort((a: any, b: any) => b.numOfPlaces - a.numOfPlaces)
      .slice(0, 4);
    return NextResponse.json(sortedResults);
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
