"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ClassFilter() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const activeTab = searchParams.get("tab") || "Semua Kelas";
	const initialQuery = searchParams.get("q") || "";

	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		setQuery(searchParams.get("q") || "");
	}, [searchParams]);

	const updateUrl = (tab: string, q: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (tab !== "Semua Kelas") {
			params.set("tab", tab);
		} else {
			params.delete("tab");
		}

		if (q.trim() !== "") {
			params.set("q", q.trim());
		} else {
			params.delete("q");
		}

		params.delete("page"); // reset page to 1 on filter change

		router.push(`${pathname}?${params.toString()}`);
	};

	// DEBOUNCE SEARCH
	useEffect(() => {
		// Prevent running if query hasn't changed from what's in URL
		if (query === (searchParams.get("q") || "")) return;

		const timer = setTimeout(() => {
			updateUrl(activeTab, query);
		}, 500);

		return () => clearTimeout(timer);
	}, [query, activeTab]); // Dependencies trigger the debounce when user types

	const handleTabChange = (tab: string) => {
		updateUrl(tab, query);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateUrl(activeTab, query);
	};

	const tabs = ["Semua Kelas", "X", "XI", "XII"];

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
			{/* TABS */}
			<div className="flex bg-slate-100 p-1 rounded-xl w-fit">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => handleTabChange(tab)}
						className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
							activeTab === tab
								? "bg-white text-slate-900 shadow-sm"
								: "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* SEARCH BAR */}
			<form onSubmit={handleSearch} className="relative w-full sm:w-64">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
				<input
					type="text"
					placeholder="Cari kelas (MIPA, IPS)..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm"
				/>
				{/* Submit button disembunyikan agar form bisa disubmit lewat enter */}
				<button type="submit" className="hidden"></button>
			</form>
		</div>
	);
}
