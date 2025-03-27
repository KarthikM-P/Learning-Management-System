"use client";   

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns,faInbox } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Sidebar = () => (
    <div className="bg-gray-200 w-64 p-6">
        <div className="text-2xl font-bold mb-8">Coursue</div>
        <nav className="space-y-4">
            <Link className="flex items-center text-gray-700 hover:text-gray-900" href="/dashboard">
                <FontAwesomeIcon icon={faTableColumns} className="mr-3" /> Dashboard
            </Link>
            <a className="flex items-center text-gray-700 hover:text-gray-900" href="#">
                <FontAwesomeIcon icon={faInbox} className="mr-3" /> Inbox
            </a>
            <a className="flex items-center text-gray-700 hover:text-gray-900" href="#">
                <i className="fas fa-book mr-3"></i> Lesson
            </a>
            <a className="flex items-center text-gray-700 hover:text-gray-900" href="#">
                <i className="fas fa-tasks mr-3"></i> Task
            </a>
            <a className="flex items-center text-gray-700 hover:text-gray-900" href="#">
                <i className="fas fa-users mr-3"></i> Group
            </a>
        </nav>
        <div className="mt-8">
            <h3 className="text-gray-600 mb-4">Friends</h3>
            <div className="space-y-4">
                <div className="flex items-center">
                    <img src="https://placehold.co/32x32" alt="Friend 1" className="rounded-full mr-3" />
                    <span>Bagas Mahipe</span>
                </div>
                <div className="flex items-center">
                    <img src="https://placehold.co/32x32" alt="Friend 2" className="rounded-full mr-3" />
                    <span>Sier Dandy</span>
                </div>
                <div className="flex items-center">
                    <img src="https://placehold.co/32x32" alt="Friend 3" className="rounded-full mr-3" />
                    <span>Jhon Tosan</span>
                </div>
            </div>
        </div>
        <div className="mt-8">
            <h3 className="text-gray-600 mb-4">Settings</h3>
            <a className="flex items-center text-gray-700 hover:text-gray-900" href="#">
                <i className="fas fa-cog mr-3"></i> Setting
            </a>
            <a className="flex items-center text-red-600 hover:text-red-800 mt-4" href="#">
                <i className="fas fa-sign-out-alt mr-3"></i> Logout
            </a>
        </div>
    </div>
);

export default Sidebar;