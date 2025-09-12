import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Car,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Wrench,
  Plus,
  Minus,
  Edit as EditIcon
} from 'lucide-react';

interface FleetModel {
  id: string;
  category: string; // Business Class, First Class, Group Travel, etc.
  model: string;    // e.g., Mercedes E-Class
  year?: number;
  seats: number;    // passengers capacity
  luggage: number;  // luggage capacity
  rate: string;     // display rate, e.g., "���80/hour"
  features?: string[];
  location?: string;
  nextMaintenance?: string;
  // Aggregated counts
  total: number;
  inUse: number;
  maintenance: number;
}

export function FleetManagement() {
  // Initial data aligned with the public site
  const [fleet, setFleet] = useState<FleetModel[]>([
    {
      id: 'MFD-E-001',
      category: 'Business Class',
      model: 'Mercedes E-Class',
      year: 2023,
      seats: 3,
      luggage: 3,
      rate: '€80/hour',
      features: ['WiFi', 'Climate Control', 'Premium Sound', 'Phone Charger'],
      location: 'Central Garage',
      nextMaintenance: '2025-06-01',
      total: 3,
      inUse: 1,
      maintenance: 0,
    },
    {
      id: 'MFD-S-001',
      category: 'First Class',
      model: 'Mercedes S-Class',
      year: 2023,
      seats: 3,
      luggage: 4,
      rate: '€120/hour',
      features: ['WiFi', 'Massage Seats', 'Champagne Bar', 'Privacy Glass'],
      location: 'On Route',
      nextMaintenance: '2025-06-15',
      total: 2,
      inUse: 1,
      maintenance: 0,
    },
    {
      id: 'MFD-V-001',
      category: 'Group Travel',
      model: 'Mercedes V-Class',
      year: 2023,
      seats: 7,
      luggage: 8,
      rate: '€140/hour',
      features: ['WiFi', 'Conference Table', 'Individual Seats', 'Extra Space'],
      location: 'Central Garage',
      nextMaintenance: '2025-07-01',
      total: 2,
      inUse: 0,
      maintenance: 1,
    },
  ]);

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Forms
  const emptyForm: FleetModel = {
    id: '',
    category: 'Business Class',
    model: '',
    year: new Date().getFullYear(),
    seats: 3,
    luggage: 3,
    rate: '€0/hour',
    features: [],
    location: 'Central Garage',
    nextMaintenance: '',
    total: 1,
    inUse: 0,
    maintenance: 0,
  };

  const [addForm, setAddForm] = useState<FleetModel>({ ...emptyForm });
  const [editForm, setEditForm] = useState<FleetModel>({ ...emptyForm });
  const [formError, setFormError] = useState<string | null>(null);

  // Helpers
  const getAvailable = (m: FleetModel) => Math.max(0, m.total - m.inUse - m.maintenance);

  const validateCounts = (m: FleetModel) => {
    const sum = m.inUse + m.maintenance;
    if (m.total < 0 || m.inUse < 0 || m.maintenance < 0) return 'Counts cannot be negative';
    if (sum > m.total) return 'In use + Maintenance cannot exceed Total vehicles';
    return null;
  };

  const updateModel = (id: string, updater: (m: FleetModel) => FleetModel) => {
    setFleet(prev => prev.map(m => (m.id === id ? updater({ ...m }) : m)));
  };

  const addModel = () => {
    const err = validateCounts(addForm);
    if (err) {
      setFormError(err);
      return;
    }
    const id = `${addForm.model.replace(/\s+/g, '-')}-${Date.now()}`;
    const newModel: FleetModel = { ...addForm, id };
    setFleet(prev => [newModel, ...prev]);
    setAddForm({ ...emptyForm });
    setFormError(null);
    setAddOpen(false);
  };

  const saveEditModel = () => {
    if (!editId) return;
    const err = validateCounts(editForm);
    if (err) {
      setFormError(err);
      return;
    }
    setFleet(prev => prev.map(m => (m.id === editId ? { ...editForm } : m)));
    setEditOpen(false);
    setEditId(null);
    setFormError(null);
  };

  const openEdit = (model: FleetModel) => {
    setEditId(model.id);
    setEditForm({ ...model });
    setFormError(null);
    setEditOpen(true);
  };

  // Derived stats and filtering
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return fleet;
    return fleet.filter(m =>
      m.model.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  }, [fleet, searchTerm]);

  const totalVehicles = useMemo(() => fleet.reduce((acc, m) => acc + m.total, 0), [fleet]);
  const totalAvailable = useMemo(() => fleet.reduce((acc, m) => acc + getAvailable(m), 0), [fleet]);
  const totalMaintenance = useMemo(() => fleet.reduce((acc, m) => acc + m.maintenance, 0), [fleet]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalVehicles}</p>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalAvailable}</p>
                <p className="text-sm text-muted-foreground">Available Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalMaintenance}</p>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Fleet Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Input
                placeholder="Search by model or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80"
              />
            </div>

            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vehicle Model
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Vehicle Model</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={addForm.category} onValueChange={(v) => setAddForm(f => ({ ...f, category: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Business Class">Business Class</SelectItem>
                          <SelectItem value="First Class">First Class</SelectItem>
                          <SelectItem value="Group Travel">Group Travel</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Model</Label>
                      <Input value={addForm.model} onChange={(e) => setAddForm(f => ({ ...f, model: e.target.value }))} placeholder="e.g., Mercedes E-Class" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input type="number" value={addForm.year || ''} onChange={(e) => setAddForm(f => ({ ...f, year: Number(e.target.value || 0) }))} />
                    </div>
                    <div>
                      <Label>Luggage</Label>
                      <Input type="number" value={addForm.luggage} onChange={(e) => setAddForm(f => ({ ...f, luggage: Math.max(0, Number(e.target.value || 0)) }))} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Rate</Label>
                      <Input value={addForm.rate} onChange={(e) => setAddForm(f => ({ ...f, rate: e.target.value }))} placeholder="€80/hour" />
                    </div>
                    <div>
                      <Label>Next Maintenance</Label>
                      <Input value={addForm.nextMaintenance || ''} onChange={(e) => setAddForm(f => ({ ...f, nextMaintenance: e.target.value }))} placeholder="YYYY-MM-DD" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Total Vehicles</Label>
                      <Input type="number" value={addForm.total} onChange={(e) => setAddForm(f => ({ ...f, total: Math.max(0, Number(e.target.value || 0)) }))} />
                    </div>
                    <div>
                      <Label>In Use</Label>
                      <Input type="number" value={addForm.inUse} onChange={(e) => setAddForm(f => ({ ...f, inUse: Math.max(0, Number(e.target.value || 0)) }))} />
                    </div>
                    <div>
                      <Label>Maintenance</Label>
                      <Input type="number" value={addForm.maintenance} onChange={(e) => setAddForm(f => ({ ...f, maintenance: Math.max(0, Number(e.target.value || 0)) }))} />
                    </div>
                  </div>

                  {formError && (
                    <div className="text-red-600 text-sm">{formError}</div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                    <Button className="bg-accent hover:bg-accent/90" onClick={addModel}>Add</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => {
              const available = getAvailable(m);
              return (
                <Card key={m.id} className="border-2 hover:border-accent/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{m.model}</h3>
                        <p className="text-sm text-muted-foreground">{m.category}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => openEdit(m)}>
                        <EditIcon className="w-4 h-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                        <span className="text-muted-foreground">Luggage:</span>
                        <p className="font-medium">{m.luggage}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Year:</span>
                        <p className="font-medium">{m.year || '-'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate:</span>
                        <p className="font-medium text-accent">{m.rate}</p>
                      </div>
                    </div>

                    {/* Counts with quick adjust */}
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="p-2 rounded border">
                        <div className="text-muted-foreground">Total</div>
                        <div className="text-xl font-semibold">{m.total}</div>
                      </div>
                      <div className="p-2 rounded border">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">In Use</span>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateModel(m.id, mm => ({ ...mm, inUse: Math.max(0, mm.inUse - 1) }))} disabled={m.inUse <= 0}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateModel(m.id, mm => ({ ...mm, inUse: Math.min(mm.total - mm.maintenance, mm.inUse + 1) }))} disabled={available <= 0}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xl font-semibold">{m.inUse}</div>
                      </div>
                      <div className="p-2 rounded border">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Maintenance</span>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateModel(m.id, mm => ({ ...mm, maintenance: Math.max(0, mm.maintenance - 1) }))} disabled={m.maintenance <= 0}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateModel(m.id, mm => ({ ...mm, maintenance: Math.min(mm.total - mm.inUse, mm.maintenance + 1) }))} disabled={available <= 0}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xl font-semibold">{m.maintenance}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 rounded border">
                        <div className="text-muted-foreground">Available</div>
                        <div className="text-xl font-semibold">{available}</div>
                      </div>
                      <div className="p-2 rounded border">
                        <div className="flex items-center gap-1 text-muted-foreground"><Wrench className="w-4 h-4" /> Next Service</div>
                        <div className="font-medium">{m.nextMaintenance || '-'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Vehicle Model</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={editForm.category} onValueChange={(v) => setEditForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Business Class">Business Class</SelectItem>
                    <SelectItem value="First Class">First Class</SelectItem>
                    <SelectItem value="Group Travel">Group Travel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Model</Label>
                <Input value={editForm.model} onChange={(e) => setEditForm(f => ({ ...f, model: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year</Label>
                <Input type="number" value={editForm.year || ''} onChange={(e) => setEditForm(f => ({ ...f, year: Number(e.target.value || 0) }))} />
              </div>
              <div>
                <Label>Luggage</Label>
                <Input type="number" value={editForm.luggage} onChange={(e) => setEditForm(f => ({ ...f, luggage: Math.max(0, Number(e.target.value || 0)) }))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rate</Label>
                <Input value={editForm.rate} onChange={(e) => setEditForm(f => ({ ...f, rate: e.target.value }))} />
              </div>
              <div>
                <Label>Next Maintenance</Label>
                <Input value={editForm.nextMaintenance || ''} onChange={(e) => setEditForm(f => ({ ...f, nextMaintenance: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Total Vehicles</Label>
                <Input type="number" value={editForm.total} onChange={(e) => setEditForm(f => ({ ...f, total: Math.max(0, Number(e.target.value || 0)) }))} />
              </div>
              <div>
                <Label>In Use</Label>
                <Input type="number" value={editForm.inUse} onChange={(e) => setEditForm(f => ({ ...f, inUse: Math.max(0, Number(e.target.value || 0)) }))} />
              </div>
              <div>
                <Label>Maintenance</Label>
                <Input type="number" value={editForm.maintenance} onChange={(e) => setEditForm(f => ({ ...f, maintenance: Math.max(0, Number(e.target.value || 0)) }))} />
              </div>
            </div>

            {formError && (
              <div className="text-red-600 text-sm">{formError}</div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button className="bg-accent hover:bg-accent/90" onClick={saveEditModel}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
