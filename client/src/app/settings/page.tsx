"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe",  type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
        <table className="min-w-full rounded-lg bg-white dark:bg-gray-900">
          <thead className="bg-gray-800 text-white dark:bg-gray-950 dark:text-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Setting
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="border-t border-gray-200 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-blue-900/20"
                key={setting.label}>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{setting.label}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="h-6 w-11 rounded-full bg-gray-200 transition
                        peer-focus:ring-4 peer-focus:ring-blue-400/40
                        after:absolute after:left-[2px] after:top-[2px]
                        after:h-5 after:w-5 after:rounded-full after:border
                        after:border-gray-300 after:bg-white after:transition-all
                        after:content-['']
                        peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white
                        dark:bg-gray-700 dark:after:border-gray-500 dark:after:bg-gray-200"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;