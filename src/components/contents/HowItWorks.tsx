import React from "react";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <section id="How it Works">
      {/* Header Biru */}
      <div className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto flex justify-around text-center">
          <div>
            <span className="text-4xl font-bold">10+</span>
            <p className="text-sm md:text-base">Exciting Features Coming</p>
          </div>
          <div>
            <span className="text-4xl font-bold">1K+</span>
            <p className="text-sm md:text-base">Products in Our Database</p>
          </div>
          <div>
            <span className="text-4xl font-bold">8K+</span>
            <p className="text-sm md:text-base">Nutrition Facts Analyzed</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Features and Image */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Features */}
          <div className="flex-1 space-y-8">
            {/* Title and Description */}
            <div className="text-left mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Your <span className="text-blue-600">Guide</span> to Healthier
                Living Made <span className="text-blue-600">Simple</span>
              </h2>
              <p className="text-black opacity-60 mt-4 text-lg">
                With cutting-edge features, our app empowers you to scan,
                analyze, and choose the best nutrition options with ease.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#EFF3FA] rounded-lg">
                <Image
                  src="/img/scan.svg"
                  alt="Scan Icon"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">Quick and Easy Scanning</h3>
                <p className="text-gray-600">
                  Scan product barcodes to instantly unlock nutritional
                  information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#EFF3FA] rounded-lg">
                <Image
                  src="/img/label.svg"
                  alt="Label Icon"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  Understand Food Labels with Ease
                </h3>
                <p className="text-gray-600">
                  Easily decode food labels to make smarter, healthier choices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#EFF3FA] rounded-lg">
                <Image
                  src="/img/nutrisi.svg"
                  alt="Nutrition Icon"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  Unlock Nutritional Details
                </h3>
                <p className="text-gray-600">
                  Explore in-depth information about ingredients and values for
                  smarter eating.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#EFF3FA] rounded-lg">
                <Image
                  src="/img/reccom.svg"
                  alt="Recommendation Icon"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  Better Product Recommendations
                </h3>
                <p className="text-gray-600">
                  Explore options that perfectly match your preferences and
                  needs.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 text-center">
            <Image
              src="/img/duahp.svg" // Replace with your actual image path
              alt="How It Works"
              width={1000}
              height={1000}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
