import React from "react";
var Footer = function () {
    return (<div className="border  h-[400px] w-full mt-32">
      <div className="py-12 h-full w-5/6 mx-auto flex items-center justify-between">
        <div className="flex-1 flex flex-col gap-4">
          <h2>About the App</h2>
          <p className="max-w-[375px]">
            At Nirvana, we believe that travel has the power to transform us.
            It&apos;s a chance to escape the ordinary, to discover new cultures, and
            to find inner peace. Our mission is to help you find your own
            nirvana, wherever it may be in the world.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-4">
          <h2>Contact</h2>
          <span>Phone: 9340977328</span>
          <span>Youtube: Samarth Chouhan</span>
          <span>GitHub: samarthchouhan07</span>
        </div>
        <div className="flex-1 flex flex-col items-end  gap-4">
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Lcocation: India</span>
        </div>
      </div>
    </div>);
};
export default Footer;
