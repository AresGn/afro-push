"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Connectez vos</span>
              <span className="block text-blue-600">marques aux créateurs africains</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              AfroPush est la première plateforme qui connecte directement les marques aux créateurs de contenu africains. Lancez des campagnes impactantes et génératrices de résultats concrets.
            </p>
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link href="/register/advertiser" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Je suis annonceur
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/register/creator" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Je suis créateur
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="relative h-64 sm:h-72 md:h-96 lg:h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="h-full w-full bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center text-gray-400 p-4">
                  {/* Image placeholder - replace with your actual image */}
                  <div className="h-48 w-48 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg font-semibold">Image Promo</span>
                  </div>
                  <p className="mt-4">Image illustrative des créateurs et annonceurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 