export const MASTER_GERBANG = {
  TABLE: {
    COLUMNS: [
      { label: 'No', field: null, align: 'center', width: 60 },
      { label: 'Nama Gerbang', field: 'NamaGerbang', align: 'center' },
      { label: 'Ruas (Nama Cabang)', field: 'NamaCabang', align: 'center' },
      { label: 'Aksi', field: null, align: 'center', width: 140 },
    ],
    EMPTY_STATE: {
      TITLE: 'Tidak Ada Data Gerbang',
      subtitle: 'Belum ada data gerbang yang sesuai dengan pencarian Anda',
    },
    TOTAL_PREFIX: 'gerbang tercatat',
  },
  DIALOG: {
    CREATE: {
      TITLE: 'Tambah Gerbang',
      SUBTITLE: 'Input data gerbang baru',
      SUCCESS: 'Gerbang berhasil ditambahkan',
    },
    EDIT: {
      TITLE: 'Edit Gerbang',
      SUBTITLE: 'Perbarui data gerbang',
      SUCCESS: 'Data gerbang berhasil diperbarui',
    },
    DELETE: {
      TITLE: 'Hapus Data Gerbang?',
      CONFIRM_PREFIX: 'Anda yakin ingin menghapus gerbang',
      CONFIRM_SUFFIX: 'dari sistem?',
      WARNING: 'Tindakan ini tidak dapat dibatalkan dan data gerbang akan dihapus secara permanen.',
      SUCCESS: 'Gerbang berhasil dihapus',
    },
    VIEW: {
      TITLE: 'Detail Gerbang',
      SUBTITLE: 'Informasi lengkap data gerbang tol',
    },
  },
  PAGINATION: {
    OPTIONS: [10, 25, 50, 100],
    LABEL_PER_PAGE: 'Tampilkan:',
  },
}
