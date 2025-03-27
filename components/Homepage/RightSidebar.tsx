
const RightSidebar = () => (
    <div className="bg-white w-80 p-6">
        <div className="text-center mb-6">
            <img src="https://placehold.co/80x80" alt="User Avatar" className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">Good Morning Jason <span className="text-yellow-500">🔥</span></h3>
            <p className="text-gray-600">Continue your learning to achieve your target!</p>
        </div>
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Statistic</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
                <canvas id="myChart" width="400" height="200"></canvas>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-bold mb-4">Your mentor</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" alt="Mentor 1" className="rounded-full mr-3" />
                        <div>
                            <h4 className="font-bold">Padhang Satrio</h4>
                            <p className="text-gray-600">Mentor</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" alt="Mentor 2" className="rounded-full mr-3" />
                        <div>
                            <h4 className="font-bold">Zaki Horizontal</h4>
                            <p className="text-gray-600">Mentor</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="https://placehold.co/40x40" alt="Mentor 3" className="rounded-full mr-3" />
                        <div>
                            <h4 className="font-bold">Leonardo Samuel</h4>
                            <p className="text-gray-600">Mentor</p>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
                </div>
            </div>
        </div>
    </div>
);
export default RightSidebar ;