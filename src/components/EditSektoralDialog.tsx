import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { useState } from "react"
import type { SektoralItem, UpdateSektoralData } from "@/hooks/useMonitoringData"
import React from "react"

interface EditSektoralDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: SektoralItem | null
  onSubmit: (data: UpdateSektoralData) => Promise<void>
  isUpdating?: boolean
}

export function EditSektoralDialog({
  open,
  onOpenChange,
  item,
  onSubmit,
  isUpdating = false
}: EditSektoralDialogProps) {
  const [formData, setFormData] = useState<UpdateSektoralData>({
    dimensi: "",
    jenis: "",
    kategori: "",
    kode_dssd: "",
    kode_urusan: "",
    satuan: "",
    uraian_dssd: ""
  })

  React.useEffect(() => {
    if (item) {
      setFormData({
        dimensi: item.dimensi,
        jenis: String(item.jenis),
        kategori: String(item.kategori),
        kode_dssd: item.kode_dssd,
        kode_urusan: item.kode_urusan,
        satuan: item.satuan,
        uraian_dssd: item.uraian_dssd
      })
    }
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Update failed:", error)
    }
  }

  const handleInputChange = (field: keyof UpdateSektoralData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Pencil className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <DialogTitle className="text-lg">Edit Data Sektoral</DialogTitle>
          </div>
          <DialogDescription>
            Perbarui data sektoral untuk ID: <span className="font-semibold">#{item.id}</span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kode_dssd">Kode DSSD</Label>
              <Input
                id="kode_dssd"
                value={formData.kode_dssd}
                onChange={(e) => handleInputChange("kode_dssd", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uraian_dssd">Uraian DSSD</Label>
              <Input
                id="uraian_dssd"
                value={formData.uraian_dssd}
                onChange={(e) => handleInputChange("uraian_dssd", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dimensi">Dimensi</Label>
              <Select value={formData.dimensi} onValueChange={(value) => handleInputChange("dimensi", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih dimensi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tahun">Tahun</SelectItem>
                  <SelectItem value="Triwulan">Triwulan</SelectItem>
                  <SelectItem value="Bulan">Bulan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="satuan">Satuan</Label>
              <Input
                id="satuan"
                value={formData.satuan}
                onChange={(e) => handleInputChange("satuan", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jenis">Jenis</Label>
              <Select value={formData.jenis} onValueChange={(value) => handleInputChange("jenis", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Jenis 1</SelectItem>
                  <SelectItem value="2">Jenis 2</SelectItem>
                  <SelectItem value="3">Jenis 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>
              <Select value={formData.kategori} onValueChange={(value) => handleInputChange("kategori", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Kategori 1</SelectItem>
                  <SelectItem value="2">Kategori 2</SelectItem>
                  <SelectItem value="3">Kategori 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="kode_urusan">Kode Urusan</Label>
              <Input
                id="kode_urusan"
                value={formData.kode_urusan}
                onChange={(e) => handleInputChange("kode_urusan", e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
              Batal
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}