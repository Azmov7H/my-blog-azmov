import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div>

      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome in Az-Blog  <br />
              <strong className="font-extrabold text-green-700 sm:block">you can find All News </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
              numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring  sm:w-auto"
                href="/posts"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
