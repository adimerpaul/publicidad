'use client'

import React, { useEffect, useState } from 'react'
import api from "@/lib/axios";
import {
    IconActivityHeartbeat,
    IconCircle,
    IconCirclePlus,
    IconEdit, IconKey,
    IconMenu2,
    IconPeace,
    IconTrash
} from "@tabler/icons-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form} from "@/components/ui/form";
import {toast} from "react-toastify";


export default function UsersPage() {
    const [users, setUsers] = useState<[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [passDialogOpen, setPassDialogOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        role: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        setLoading(true)
        api.get('/users').then((response) => {
            setUsers(response.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="p-6">
            <div className={"flex justify-between items-center mb-4"}>
                <div className="text-2xl font-bold mb-4">Usuarios</div>
                <button
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                    onClick={() => {
                        setShowForm(true)
                        setForm({
                            name: '',
                            username: '',
                            password: '',
                            role: ''
                        })
                    }}
                >
                    <IconCirclePlus />
                    Crear Usuario
                </button>
            </div>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <div className="overflow-auto rounded shadow border">
                    <table className="min-w-full text-sm">
                        <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">Acciones</th>
                            {/*<th className="p-2">ID</th>*/}
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Usuario</th>
                            <th className="p-2">Rol</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="p-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                <IconMenu2 />
                                                Opciones
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setShowForm(true)
                                                    setForm({
                                                        id: user.id,
                                                        name: user.name,
                                                        username: user.username,
                                                        password: user.password,
                                                        role: user.role
                                                    })
                                                }}
                                            >
                                                <IconEdit />
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDialogOpen(true)
                                                    setForm({
                                                        id: user.id,
                                                        name: user.name,
                                                        username: user.username,
                                                        password: user.password,
                                                        role: user.role
                                                    })
                                                }}
                                            >
                                                <IconTrash  />
                                                Eliminar
                                            </DropdownMenuItem>
                                            {/*update password*/}
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setPassDialogOpen(true)
                                                    setForm({
                                                        id: user.id,
                                                        name: user.name,
                                                        username: user.username,
                                                        password: '',
                                                        role: user.role
                                                    })
                                                }}
                                            >
                                                <IconKey />
                                                Cambiar Contraseña
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                                {/*<td className="p-2">{user.id}</td>*/}
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {form.id ? 'Editar Usuario' : 'Crear Usuario'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (!form.role) {
                                toast.error('Por favor selecciona un rol')
                                return false
                            }

                            setLoading(true)
                            if (form.id) {
                                // Handle update user
                                api.put(`/users/${form.id}`, form).then(() => {
                                    setShowForm(false)
                                    setUsers((prev) => prev.map((user) => user.id === form.id ? form : user))
                                }).finally(() => {
                                    setLoading(false)
                                })
                            } else {
                                // Handle create user
                                api.post('/users', form).then((res) => {
                                    setShowForm(false)
                                    setUsers((prev) => [...prev, res.data])
                                }).finally(() => {
                                    setLoading(false)
                                })
                            }
                        }}>
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" name="name" value={form.name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <Label htmlFor="username">Usuario</Label>
                                <Input id="username" name="username" value={form.username} onChange={handleChange}
                                       required/>
                            </div>
                            <div>
                                <Label htmlFor="role">Rol</Label>
                                {/*<Input id="role" name="role" value={form.role} onChange={handleChange} required/>*/}
                                <Select id="role" name="role" value={form.role}
                                        onValueChange={(value) => setForm((prev) => ({...prev, role: value}))}
                                        required
                                >
                                    <SelectTrigger className="w-full" aria-label="Seleccionar rol">
                                        <SelectValue placeholder="Seleccionar rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="User">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {!form.id && (
                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" name="password" value={form.password} onChange={handleChange}
                                           type="password" required/>
                                </div>
                            )}
                            <DialogFooter className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowForm(false)} disabled={loading}>
                                    Cancelar
                                </Button>
                                <Button
                                    disabled={loading}
                                    type={"submit"}
                                >
                                    {form.id ? 'Actualizar Usuario' : 'Crear Usuario'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar Usuario</DialogTitle>
                    </DialogHeader>
                    <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}
                                disabled={loading}
                        >Cancelar</Button>
                        <Button
                            disabled={loading}
                            variant="destructive"
                            onClick={() => {
                                setLoading(true)
                                api.delete(`/users/${form.id}`).then((res) => {
                                    setUsers((prev) => prev.filter((user) => user.id !== res.data.id))
                                    setDialogOpen(false)
                                }).finally(() => {
                                    setLoading(false)
                                })
                            }}
                        >
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={passDialogOpen} onOpenChange={setPassDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cambiar Contraseña</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setLoading(true)
                        api.put(`/users/${form.id}`, form).then(() => {
                            setPassDialogOpen(false)
                            setUsers((prev) => prev.map((user) => user.id === form.id ? form : user))
                        }).finally(() => {
                            setLoading(false)
                        })
                    }}>
                        <div>
                            <Label htmlFor="password">Nueva Contraseña</Label>
                            <Input id="password" name="password" value={form.password} onChange={handleChange}
                                   type="password" required/>
                        </div>
                        <DialogFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setPassDialogOpen(false)} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button
                                disabled={loading}
                                type={"submit"}
                            >
                                Cambiar Contraseña
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
