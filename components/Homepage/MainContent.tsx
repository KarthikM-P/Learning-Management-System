import Courses from "@/app/courses/page";
import Link from "next/link";


const MainContent = () => (
    <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="Search your course..." className="w-1/2 p-2 rounded-lg border border-gray-300" />
            <div className="flex items-center">
                <img src="https://placehold.co/40x40" alt="User Avatar" className="rounded-full mr-3" />
                <Link href="/sign-up">SignIn / SignUp</Link>
            </div>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-2">Sharpen Your Skills with Professional Online Courses</h2>
            <button className="bg-black text-white px-4 py-2 rounded-lg">Join Now</button>
        </div>
        <div className="flex space-x-4 mb-6">
            <div className="bg-white p-4 rounded-lg flex-1 text-center">
                <h3 className="text-lg font-bold">2/6 Watched</h3>
                <p>UI/UX Design</p>
            </div>
            <div className="bg-white p-4 rounded-lg flex-1 text-center">
                <h3 className="text-lg font-bold">3/6 Watched</h3>
                <p>Branding</p>
            </div>
            <div className="bg-white p-4 rounded-lg flex-1 text-center">
                <h3 className="text-lg font-bold">6/6 Watched</h3>
                <p>Front End</p>
            </div>
        </div>
        <h3 className="text-xl font-bold mb-4">Continue Watching</h3>
        <div className="flex space-x-4 mb-6">
            {/* <Courses/> */}
        </div>
        <h3 className="text-xl font-bold mb-4">Your Lesson</h3>
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img src="https://placehold.co/40x40" alt="Mentor" className="rounded-full mr-3" />
                    <div>
                        <h4 className="font-bold">Padhang Satrio</h4>
                        <p className="text-gray-600">2/10/2020</p>
                    </div>
                </div>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">UI/UX Design</span>
            </div>
            <h4 className="font-bold">Understand Of UI/UX Design</h4>
        </div>
    </div>
);
export default MainContent ;