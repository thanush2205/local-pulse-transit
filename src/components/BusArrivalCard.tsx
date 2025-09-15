import React from 'react'

interface BusStop {
  name: string
  etaMinutes: number
  status: 'upcoming' | 'destination'
}

interface Bus {
  routeName: string
  departureTime: string
  arrivalTime: string
  status: string
  capacityStatus: string
}

interface BusArrivalCardProps {
  selectedBus: Bus
  originName: string
  destinationName: string
  generateBusStops: () => BusStop[]
  onBack: () => void
}

const BusArrivalCard: React.FC<BusArrivalCardProps> = ({
  selectedBus,
  originName,
  destinationName,
  generateBusStops,
  onBack
}) => {
  const stops = generateBusStops()

  return (
    <div className="space-y-6">
      {/* Bus Details Card */}
      <div className="p-8 bg-gradient-to-r from-green-100 via-blue-50 to-purple-100 rounded-2xl border border-green-200 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🚌</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">Selected Bus Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-700">Route Information</h4>
            <p className="text-green-600">
              <span className="font-medium">Route:</span> {selectedBus.routeName}
            </p>
            <p className="text-green-600">
              <span className="font-medium">From:</span> {originName}
            </p>
            <p className="text-green-600">
              <span className="font-medium">To:</span> {destinationName}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-green-700">Timing</h4>
            <p className="text-green-600">
              <span className="font-medium">Departure:</span> {selectedBus.departureTime}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Arrival:</span> {selectedBus.arrivalTime}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-green-700">Status</h4>
            <p className="text-green-600">
              <span className="font-medium">Status:</span> {selectedBus.status}
            </p>
            <p className="text-green-600">
              <span className="font-medium">Capacity:</span> {selectedBus.capacityStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Bus Stops & ETA */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🚏</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Bus Stops & Schedule</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stops.map((stop, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  stop.status === 'destination'
                    ? 'bg-gradient-to-r from-green-100 to-blue-100 border-green-300 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      stop.status === 'destination'
                        ? 'bg-gradient-to-r from-green-500 to-blue-500'
                        : 'bg-gradient-to-r from-orange-500 to-red-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-bold ${
                        stop.status === 'destination' ? 'text-green-800' : 'text-gray-800'
                      }`}
                    >
                      {stop.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        stop.status === 'destination' ? 'text-green-600' : 'text-gray-600'
                      }`}
                    >
                      ETA: {stop.etaMinutes} minutes
                    </p>
                    {stop.status === 'destination' && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">
                        Final Destination
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="group px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-3">
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Available Buses</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default BusArrivalCard