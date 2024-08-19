var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Abu_dhabi from "../../../../../public/AbuDhabi.jpg";
import Berlin from "../../../../../public/berlin.jpg";
import Hamburg from "../../../../../public/Hamburg.jpg";
import Paris from "../../../../../public/paris.jpg";
import St_tropez from "../../../../../public/StTropez.jpg";
import Mumbai from "../../../../../public/Mumbai.jpg";
import Delhi from "../../../../../public/delhi.jpg";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const abudhabi_listings = yield db.listing.count({
                where: {
                    location: "abu-dhabi",
                },
            });
            const dubai_listings = yield db.listing.count({
                where: {
                    location: "dubai",
                },
            });
            const mumbai_listings = yield db.listing.count({
                where: {
                    location: "mumbai",
                },
            });
            const delhi_listings = yield db.listing.count({
                where: {
                    location: "delhi",
                },
            });
            const berlin_listings = yield db.listing.count({
                where: {
                    location: "berlin",
                },
            });
            const hamnurg_listings = yield db.listing.count({
                where: {
                    location: "hamburg",
                },
            });
            const st_tropez_listings = yield db.listing.count({
                where: {
                    location: "st-tropez",
                },
            });
            const paris_listings = yield db.listing.count({
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
                .sort((a, b) => b.numOfPlaces - a.numOfPlaces)
                .slice(0, 4);
            return NextResponse.json(sortedResults);
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
