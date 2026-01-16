import { useState } from 'react'
import { Typography, Snackbar, Alert } from '@mui/material'
import { BRAND_COLORS } from '@/lib/colors'
import { useGerbang } from './hooks/useGerbang'
import { GerbangFilter } from './components/GerbangFilter'
import { GerbangTable } from './components/GerbangTable'
import { GerbangFormDialog } from './components/GerbangFormDialog'
import { GerbangViewDialog } from './components/GerbangViewDialog'
import ConfirmationDialog from '@/components/common/feedback/ConfirmationDialog'
import { LoadingState, ErrorState } from '@/components/common/feedback'
import { MASTER_GERBANG } from '@/constants/masterGerbang'
import type { MasterGerbang, GerbangFormData } from '@/types/masterGerbang'
import { formatErrorMessage } from '@/lib/formatErrorMessage'

const TEXT = MASTER_GERBANG.DIALOG.DELETE

export default function MasterGerbangPage() {
  // Hook
  const { data, loading, error: fetchError, pagination, filter, actions } = useGerbang()

  // Local State - Dialogs
  const [viewDialog, setViewDialog] = useState<{ open: boolean; data: MasterGerbang | null }>({
    open: false,
    data: null,
  })

  const [formDialog, setFormDialog] = useState<{
    open: boolean
    mode: 'create' | 'edit'
    data: MasterGerbang | null
  }>({
    open: false,
    mode: 'create',
    data: null,
  })

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    data: MasterGerbang | null
  }>({
    open: false,
    data: null,
  })

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({
    open: false,
    message: '',
    severity: 'success',
  })

  // Dialog Handlers
  const handleOpenCreate = () => setFormDialog({ open: true, mode: 'create', data: null })
  const handleOpenView = (d: MasterGerbang) => setViewDialog({ open: true, data: d })
  const handleOpenEdit = (d: MasterGerbang) => setFormDialog({ open: true, mode: 'edit', data: d })
  const handleOpenDelete = (d: MasterGerbang) => setDeleteDialog({ open: true, data: d })

  const handleCloseDialogs = () => {
    setViewDialog({ open: false, data: null })
    setFormDialog({ open: false, mode: 'create', data: null })
    setDeleteDialog({ open: false, data: null })
  }

  // CRUD Handlers
  const handleFormSubmit = async (formData: GerbangFormData) => {
    try {
      if (formDialog.mode === 'create') {
        await actions.create({
          id: formData.id,
          IdCabang: formData.IdCabang,
          NamaCabang: formData.NamaCabang.trim(),
          NamaGerbang: formData.NamaGerbang.trim(),
        })
        setSnackbar({
          open: true,
          message: MASTER_GERBANG.DIALOG.CREATE.SUCCESS,
          severity: 'success',
        })
      } else if (formDialog.data) {
        await actions.update({
          id: formDialog.data.id,
          IdCabang: formData.IdCabang,
          NamaCabang: formData.NamaCabang.trim(),
          NamaGerbang: formData.NamaGerbang.trim(),
        })
        setSnackbar({
          open: true,
          message: MASTER_GERBANG.DIALOG.EDIT.SUCCESS,
          severity: 'success',
        })
      }
      handleCloseDialogs()
    } catch {
      // Errors handled by mutation state
    }
  }

  const handleConfirmDelete = async () => {
    if (deleteDialog.data) {
      try {
        await actions.delete({
          id: deleteDialog.data.id,
          IdCabang: deleteDialog.data.IdCabang,
        })
        setSnackbar({
          open: true,
          message: TEXT.SUCCESS,
          severity: 'success',
        })
        handleCloseDialogs()
      } catch (error) {
        setSnackbar({ open: true, message: formatErrorMessage(error), severity: 'error' })
      }
    }
  }

  // Loading State
  if (loading && data.length === 0) {
    return <LoadingState />
  }

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <Typography
          variant="h5"
          component="h1"
          fontWeight={700}
          color={BRAND_COLORS.primary}
          mb={0.5}
        >
          Master Data Gerbang
        </Typography>
        <Typography variant="body2" color={BRAND_COLORS.neutral500} fontWeight={500}>
          Kelola data gerbang tol dalam sistem
        </Typography>
      </header>

      {/* Error */}
      {fetchError && (
        <ErrorState message={formatErrorMessage(fetchError)} onRetry={actions.refresh} />
      )}

      {/* Filter */}
      <section className="mb-6">
        <GerbangFilter
          search={filter.search}
          onSearchChange={filter.onSearch}
          onReset={filter.onReset}
          onAddClick={handleOpenCreate}
          totalItems={pagination.totalItems}
        />
      </section>

      {/* Table */}
      <section>
        <GerbangTable
          data={data}
          sortConfig={filter.sort}
          currentPage={pagination.page}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          totalPages={pagination.totalPages}
          isLoading={loading}
          onSortChange={filter.onSort}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 pt-4 text-center">
        <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
          &copy; {new Date().getFullYear()} PT Jasa Marga (Persero) Tbk. All rights reserved.
        </Typography>
      </footer>

      {/* Dialogs */}
      <GerbangViewDialog
        open={viewDialog.open}
        onClose={handleCloseDialogs}
        data={viewDialog.data}
      />

      <GerbangFormDialog
        open={formDialog.open}
        onClose={handleCloseDialogs}
        onSubmit={handleFormSubmit}
        mode={formDialog.mode}
        initialData={formDialog.data}
        isLoading={formDialog.mode === 'create' ? actions.isCreating : actions.isUpdating}
        error={formDialog.mode === 'create' ? actions.createError : actions.updateError}
      />

      <ConfirmationDialog
        open={deleteDialog.open}
        onClose={handleCloseDialogs}
        onConfirm={handleConfirmDelete}
        title={TEXT.TITLE}
        message={
          deleteDialog.data ? (
            <>
              {TEXT.CONFIRM_PREFIX} <strong>{deleteDialog.data.NamaGerbang}</strong>{' '}
              {TEXT.CONFIRM_SUFFIX}
              <br />
              <br />
              {TEXT.WARNING}
            </>
          ) : (
            ''
          )
        }
        confirmText="Ya, Hapus"
        variant="danger"
        isLoading={actions.isDeleting}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '12px', fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
