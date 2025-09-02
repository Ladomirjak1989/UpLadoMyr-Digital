'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';

type Role = 'admin' | 'user';
type User = {
  id: number;
  email: string;
  username: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
};

const AdminUsersPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create form
  const [openCreate, setOpenCreate] = useState(false);
  const [cEmail, setCEmail] = useState('');
  const [cUsername, setCUsername] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Edit form
  const [editId, setEditId] = useState<number | null>(null);
  const [eEmail, setEEmail] = useState('');
  const [eUsername, setEUsername] = useState('');

  // Access control
  useEffect(() => {
    if (!isLoading) {
      if (!user) router.replace('/signin');
      else if (user.role !== 'admin') router.replace('/unauthorized');
    }
  }, [isLoading, user, router]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<User[]>('/api/users', {});
      console.log('USERS:', data);
      setRows(data);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchUsers();
  }, [user?.role]);

  const onCreate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusyId(-1);
    setError(null);
    try {
      await axios.post('/api/users', {
        email: cEmail.trim().toLowerCase(),
        username: cUsername.trim(),
        password: cPassword,
      });
      setOpenCreate(false);
      setCEmail('');
      setCUsername('');
      setCPassword('');
      await fetchUsers();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Create failed');
    } finally {
      setBusyId(null);
    }
  };

  const startEdit = (u: User) => {
    setEditId(u.id);
    setEEmail(u.email);
    setEUsername(u.username);
  };

  const onUpdate = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!editId) return;
    setBusyId(editId);
    setError(null);
    try {
      await axios.patch(`/api/users/${editId}`, {
        email: eEmail.trim().toLowerCase(),
        username: eUsername.trim(),
      });
      setEditId(null);
      await fetchUsers();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Update failed');
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    setBusyId(id);
    setError(null);
    try {
      await axios.delete(`/api/users/${id}`);
      await fetchUsers();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  const onRole = async (id: number, role: Role) => {
    setBusyId(id);
    setError(null);
    try {
      await axios.patch(`/api/users/${id}/role`, { role });
      await fetchUsers();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Role change failed');
    } finally {
      setBusyId(null);
    }
  };

  const isDisabled = useMemo(() => loading || busyId !== null, [loading, busyId]);

  if (isLoading || (user && user.role !== 'admin')) {
    return <div className="p-8">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-800">Users</h1>
        <button
          onClick={() => setOpenCreate(true)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:opacity-60"
          disabled={isDisabled}
        >
          + Create user
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6" colSpan={5}>
                  No users yet.
                </td>
              </tr>
            ) : (
              rows.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-3">{u.id}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.username}</td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded border px-2 py-1"
                      value={u.role}
                      onChange={(e) => onRole(u.id, e.target.value as Role)}
                      disabled={isDisabled}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(u)}
                        className="rounded-lg border px-3 py-1 hover:bg-slate-50 disabled:opacity-60"
                        disabled={isDisabled}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(u.id)}
                        className={cn(
                          'rounded-lg px-3 py-1 text-white',
                          'bg-rose-600 hover:bg-rose-700 disabled:opacity-60'
                        )}
                        disabled={isDisabled}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {openCreate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form onSubmit={onCreate} className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Create user</h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border px-3 py-2"
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border px-3 py-2"
                value={cUsername}
                onChange={(e) => setCUsername(e.target.value)}
                required
                minLength={3}
                maxLength={32}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border px-3 py-2"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2"
                onClick={() => setOpenCreate(false)}
                disabled={isDisabled}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60"
                disabled={isDisabled}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit modal */}
      {editId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form onSubmit={onUpdate} className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Edit user #{editId}</h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border px-3 py-2"
                value={eEmail}
                onChange={(e) => setEEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border px-3 py-2"
                value={eUsername}
                onChange={(e) => setEUsername(e.target.value)}
                required
                minLength={3}
                maxLength={32}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2"
                onClick={() => setEditId(null)}
                disabled={isDisabled}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
                disabled={isDisabled}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
