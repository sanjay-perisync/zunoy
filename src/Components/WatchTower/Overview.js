import React from 'react'
import UptimeGraph from './UptimeGraph ';
import { useSelector } from 'react-redux';
import ResponseTimeGraph from './LineGraph';

const Overview = ({ monitor }) => {
  const monitorHost =
    monitor?.data?.https?.host ||
    monitor?.data?.ping?.host ||
    monitor?.data?.keyword?.host ||
    monitor?.data?.port?.host;


  const port = monitor?.data?.port?.port;


  const graphData = useSelector((state) => state?.MonitorSliceReducer?.ViewGraphSlice || []);

  return (
    <div>

      <div className=" mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* left section */}
          <div className="bg-white  p-6">

            <section>

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold mb-4">Monitor Info</h2>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">{monitor?.data?.type}</span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <p className=" font-medium">Name</p>
                  <p className="text-gray-500">{monitor?.data?.name}</p>
                </div>
                <div>
                  <p className=" font-medium">Created at</p>
                  <p className="text-gray-500">{monitor?.data?.createdAt}</p>
                </div>
                <div>
                  <p className=" font-medium">Method</p>
                  <p className="text-white bg-customGreen px-2 flex justify-center items-center py-[1px] font-semibold rounded-xl w-12">{monitor?.data?.method || "GET"}</p>
                </div>
                <div>
                  <p className=" font-medium">URL</p>
                  <p className="text-gray-500">{monitorHost}</p>
                </div>
                <div>
                  <p className=" font-medium">Port</p>
                  <p className="text-gray-500">{port || 1234}</p>
                </div>
                <div>
                  <p className=" font-medium">Check Interval</p>
                  <p className="text-gray-500">5m</p>
                </div>
                <div>
                  <p className=" font-medium">Request Timeout</p>
                  <p className="text-gray-500">30s</p>
                </div>
                <div>
                  <p className=" font-medium">Region</p>
                  <p className="text-gray-500">{monitor?.data?.location}</p>
                </div>
              </div>
            </section>



            <section className='border rounded-xl w-full lg:w-96 mt-10'>
              <div className='border-b p-4 font-semibold text-xl'>
                <h1>Appears On</h1>
              </div>

              <div className='p-4 flex flex-col justify-center items-center'>
                <img src='https://watchtower.zunoy.com/assets/errors/no-data.svg' alt='' className='h-52 w-52'></img>
                <p>Monitor is not linked to any status page</p>
                <button className='border px-2 py-2 rounded-xl text-indigo-500 mt-3'>Create Status Page</button>
              </div>
            </section>




            <section className='border rounded-xl  w-full lg:w-96 mt-10'>
              <div className='border-b p-4 font-semibold text-xl'>
                <h1>Upcoming Maintenance</h1>
              </div>

              <div className='p-4 flex flex-col justify-center items-center'>
                <img src='https://watchtower.zunoy.com/assets/errors/no-data.svg' alt='' className='h-52 w-52'></img>
                <p>There are no upcoming maintenance</p>
                <button className='border px-2 py-2 rounded-xl text-indigo-500 mt-3'>Create Maintenance</button>
              </div>
            </section>





            <section className='border rounded-xl  w-auto lg:w-[360px] mt-10'>
              <div className='border-b p-4 font-semibold text-xl'>
                <h1>Creator Info</h1>
              </div>

              <div className='p-4 flex items-center'>
                <img src={monitor?.data?.creator?.profilePic} alt='' className='h-14 w-14 object-contain rounded-full mr-2'></img>
                <div>
                  <p>{monitor?.data?.creator?.name}</p>
                  <div className='flex flex-wrap items-center '>
                    <p className='mr-2'>{monitor?.data?.creator?.email}</p>
                    <button className='border px-2 py-1 rounded-xl mt-3'>owner</button>
                  </div>
                </div>
              </div>
            </section>
          </div>




          {/* right section */}
          <div className="bg-white p-6">

            <section>
              <h2 className="text-lg font-semibold mb-4">Last checked at</h2>
              <p className="text-gray-500">{monitor?.data?.updatedAt}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

                <div className='flex items-center bg-green-50 p-4 rounded-xl gap-4'>
                  <div>
                    <img src='https://watchtower.zunoy.com/assets/iconly/iconly-glass-tick.svg' className='h-16 w-16'></img>
                  </div>
                  <div >
                    <p className="text-gray-600 text-sm">Overall Uptime</p>
                    <p className="text-xl font-bold">{monitor?.data?.overAllUptime}%</p>
                  </div>
                </div>


                <div className='flex items-center bg-red-50 p-4 rounded-xl gap-4'>
                  <div>
                    <img src='https://watchtower.zunoy.com/assets/iconly/iconly-glass-chart.svg' className='h-16 w-16'></img>
                  </div>
                  <div >
                    <p className="text-gray-600 text-sm">Monitor is down</p>
                    <p className="text-xl font-bold">22m 42s</p>
                  </div>
                </div>



                <div className='flex items-center bg-green-50 p-4 rounded-xl gap-4'>
                  <div>
                    <img src='https://watchtower.zunoy.com/assets/iconly/iconly-glass-shield.svg' className='h-16 w-16'></img>
                  </div>
                  <div >
                    <p className="text-gray-600 text-sm">Average Response Time</p>
                    <p className="text-xl font-bold">{graphData?.data?.avgRespTime}</p>
                  </div>
                </div>


                <div className='flex items-center bg-blue-50 p-4 rounded-xl gap-4'>
                  <div>
                    <img src='https://watchtower.zunoy.com/assets/iconly/iconly-glass-info.svg' className='h-16 w-16'></img>
                  </div>
                  <div >
                    <p className="text-gray-600 text-sm">Total Incidents</p>
                    <p className="text-xl font-bold">{monitor?.data?.incidentCount}</p>
                  </div>
                </div>


              </div>
            </section>


            <section>
             
              <UptimeGraph monitorId={monitor?.data?.id} />
              <ResponseTimeGraph monitorId={monitor?.data?.id} />
     
              
            </section>



            <section className='border rounded-xl  w-auto mt-10'>
              <div className='border-b p-4'>
                <h1 className=' font-semibold text-xl'>Incidents</h1>
                <p>This field shows the incidents list in current selected period</p>
              </div>

              <div>
                <div className='flex items-center bg-green-50 p-4 rounded-xl gap-4 m-8'>
                  <div>
                    <img src='https://watchtower.zunoy.com/assets/iconly/iconly-glass-shield.svg' className='h-16 w-16'></img>
                  </div>
                  <div >
                    <p className="text-gray-600 text-sm">Good Job, no incidents so far</p>
                    <p className="text-xl font-bold">Keep it up!</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview