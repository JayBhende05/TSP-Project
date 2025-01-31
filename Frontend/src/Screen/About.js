import React from 'react'



function About() {
  return (
    <>
    {/* <!-- Container for demo purpose --> */}
<div class="container my-24 px-6 mx-auto">

    {/* <!-- Section: Design Block --> */}
    <section class="mb-32 text-gray-800 text-center lg:text-left">
      <div class="block rounded-lg shadow-lg bg-white">
        <div class="flex flex-wrap items-center">
          <div class="block w-full lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/086.jpg"
              alt="Trendy Pants and Shoes"
              class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
            />
          </div>
          <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
            <div class="px-6 py-12 md:px-12">
              <h2 class="text-3xl font-bold mb-4 text-blue-600 display-5">WristCrafters</h2>
              <p class="text-gray-500 mb-12">
                Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis
                malesuada. Aenean gravida magna orci, non efficitur est porta id. Donec magna
                diam.
              </p>

              <div class="grid lg:gap-x-12 md:grid-cols-3">
                <div class="mb-12 md:mb-0">
                  <h2 class="text-3xl font-bold text-blue-600 mb-4">1000</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Happy customers</h5>
                </div>

                <div class="mb-12 md:mb-0">
                  <h2 class="text-3xl font-bold text-blue-600 mb-4">70%</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Growth</h5>
                </div>

                <div class="">
                  <h2 class="text-3xl font-bold text-blue-600 mb-4">49</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Projects</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    

</div>

    </>
  )
}

export default About
