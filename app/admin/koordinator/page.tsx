"use client";

import { useState, useEffect } from "react";
import { Plus, X, Users, Search, Save, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function KoordinatorPage() {
	const router = useRouter();
	const [users, setUsers] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({ username: "", password: "", nama: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		getSession().then((session: any) => {
			if (!session || session.user.role === "KOORDINATOR") {
				router.push("/admin/dashboard");
			} else {
				fetchKoordinator();
			}
		});
	}, [router]);

	const fetchKoordinator = async () => {
		try {
			const res = await fetch("/api/koordinator");
			const data = await res.json();
			setUsers(data);
		} catch (error) {
			console.error("Gagal mengambil data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const res = await fetch("/api/koordinator", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				setShowModal(false);
				setFormData({ username: "", password: "", nama: "" });
				fetchKoordinator();
			} else {
				const err = await res.json();
				alert(err.error || "Gagal menyimpan akun.");
			}
		} catch (error) {
			alert("Terjadi kesalahan.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("Yakin ingin menghapus akun ini?")) {
			try {
				const res = await fetch(`/api/koordinator?id=${id}`, { method: "DELETE" });
				if (res.ok) {
					fetchKoordinator();
				} else {
					alert("Gagal menghapus akun.");
				}
			} catch (error) {
				alert("Terjadi kesalahan.");
			}
		}
	};

	if (isLoading) return <div className="p-8 text-center">Memuat data...</div>;

	return (
		<div className="p-4 sm:p-8 space-y-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-2xl font-bold text-slate-800">Akun Koordinator</h1>
					<p className="text-slate-500 text-sm mt-1">Kelola akun koordinator untuk LINO</p>
				</div>
				<button
					onClick={() => setShowModal(true)}
					className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
				>
					<Plus className="h-4 w-4" />
					Tambah Akun
				</button>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm text-slate-600">
						<thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
							<tr>
								<th className="px-6 py-4">No</th>
								<th className="px-6 py-4">Nama Lengkap</th>
								<th className="px-6 py-4">Username</th>
								<th className="px-6 py-4">Role</th>
								<th className="px-6 py-4 text-center">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{users.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-8 text-center text-slate-500">
										Belum ada data koordinator.
									</td>
								</tr>
							) : (
								users.map((user, i) => (
									<tr key={user.id} className="hover:bg-slate-50/50">
										<td className="px-6 py-4">{i + 1}</td>
										<td className="px-6 py-4 font-medium text-slate-800">{user.nama}</td>
										<td className="px-6 py-4">{user.username}</td>
										<td className="px-6 py-4">
											<span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
												{user.role}
											</span>
										</td>
										<td className="px-6 py-4 text-center">
											<button
												onClick={() => handleDelete(user.id)}
												className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
												title="Hapus"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
						<div className="flex items-center justify-between p-6 border-b border-slate-100">
							<h3 className="font-bold text-lg text-slate-800">Tambah Koordinator</h3>
							<button
								onClick={() => setShowModal(false)}
								className="text-slate-400 hover:text-slate-600 transition-colors"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<form onSubmit={handleSubmit} className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
								<input
									type="text"
									required
									value={formData.nama}
									onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
									className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
									placeholder="Masukkan nama"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
								<input
									type="text"
									required
									value={formData.username}
									onChange={(e) => setFormData({ ...formData, username: e.target.value })}
									className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
									placeholder="Masukkan username"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
								<input
									type="password"
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
									placeholder="Masukkan password"
								/>
							</div>
							<div className="pt-2 flex justify-end gap-3">
								<button
									type="button"
									onClick={() => setShowModal(false)}
									className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
								>
									{isSubmitting ? "Menyimpan..." : (
										<>
											<Save className="h-4 w-4" />
											Simpan
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
