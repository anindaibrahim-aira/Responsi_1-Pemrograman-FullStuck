let daftarMahasiswa = [
    { id: 1, nim: '2411501012', nama: 'Aira karvelyn', prodi: 'Teknologi Informasi', angkatan: 2024 },
    { id: 2, nim: '2411501026', nama: 'Nazyha Isyhihara', prodi: 'Arsitektur', angkatan: 2024 },
    { id: 3, nim: '2511501052', nama: 'Ananda putra', prodi: 'Bioteknologi', angkatan: 2025 }
];
let nextId = 4;

const tabelBody = document.getElementById('tabel-body-mahasiswa');
const formTambah = document.getElementById('form-tambah-mahasiswa');
const formEdit = document.getElementById('form-edit-mahasiswa');

function renderTabel() {
    tabelBody.innerHTML = ''; 

    if (daftarMahasiswa.length === 0) {
        tabelBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Belum ada data mahasiswa.</td></tr>';
        return;
    }

    daftarMahasiswa.forEach((mhs, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${mhs.nim}</td>
            <td>${mhs.nama}</td>
            <td>${mhs.prodi}</td>
            <td class="text-center">${mhs.angkatan}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-warning me-2 edit-btn" data-id="${mhs.id}">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${mhs.id}">Hapus</button>
            </td>
        `;
        tabelBody.appendChild(row);
    });

    setupTableEventListeners();
}

$(document).ready(function() {
    renderTabel();
    setupStaticEventListeners();
});

function setupTableEventListeners() {
    $('.edit-btn').off('click').on('click', function() {
        const id = $(this).data('id');
        tampilkanModalEdit(id);
    });

    $('.delete-btn').off('click').on('click', function() {
        const id = $(this).data('id');
        tampilkanModalDelete(id);
    });
}

function setupStaticEventListeners() {
    formTambah.addEventListener('submit', function(e) {
        e.preventDefault();
        tambahMahasiswa();
    });

    formEdit.addEventListener('submit', function(e) {
        e.preventDefault();
        simpanPerubahanEdit();
    });

    $('#konfirmasi-hapus-btn').on('click', function() {
        hapusMahasiswa();
    });
    
    $('#sidebar-toggle-btn').on('click', function() {
        $('#sidebar').toggleClass('d-none d-lg-block'); 
        $('#sidebar').toggleClass('col-12 col-lg-3'); 
    });
}

function tambahMahasiswa() {
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const prodi = document.getElementById('prodi').value;
    const angkatan = parseInt(document.getElementById('angkatan').value);

    const isNimExist = daftarMahasiswa.some(mhs => mhs.nim === nim);
    if (isNimExist) {
        alert('NIM sudah terdaftar. Gunakan NIM lain.');
        return;
    }

    const mhsBaru = {
        id: nextId++,
        nim,
        nama,
        prodi,
        angkatan
    };

    daftarMahasiswa.push(mhsBaru);
    renderTabel();
    formTambah.reset(); 
    alert('Data mahasiswa berhasil ditambahkan!');
}

function tampilkanModalEdit(id) {
    const mhs = daftarMahasiswa.find(mhs => mhs.id === id);
    if (!mhs) return;

    document.getElementById('edit-id').value = mhs.id;
    document.getElementById('edit-nim').value = mhs.nim;
    document.getElementById('edit-nama').value = mhs.nama;
    document.getElementById('edit-prodi').value = mhs.prodi;
    document.getElementById('edit-angkatan').value = mhs.angkatan;
    
    const modalEdit = new bootstrap.Modal(document.getElementById('modal-edit'));
    modalEdit.show();
}

function simpanPerubahanEdit() {
    const id = parseInt(document.getElementById('edit-id').value);
    const namaBaru = document.getElementById('edit-nama').value.trim();
    const prodiBaru = document.getElementById('edit-prodi').value;
    const angkatanBaru = parseInt(document.getElementById('edit-angkatan').value);

    const index = daftarMahasiswa.findIndex(mhs => mhs.id === id);
    
    if (index !== -1) {
        daftarMahasiswa[index].nama = namaBaru;
        daftarMahasiswa[index].prodi = prodiBaru;
        daftarMahasiswa[index].angkatan = angkatanBaru;
        
        renderTabel();
        
        const modalEdit = bootstrap.Modal.getInstance(document.getElementById('modal-edit'));
        modalEdit.hide();
        alert('Data mahasiswa berhasil diubah!');
    }
}

function tampilkanModalDelete(id) {
    const mhs = daftarMahasiswa.find(mhs => mhs.id === id);
    if (!mhs) return;

    document.getElementById('delete-id-to-remove').value = mhs.id;
    document.getElementById('delete-nama-mhs').textContent = mhs.nama;
    document.getElementById('delete-nim-mhs').textContent = mhs.nim;

    const modalDelete = new bootstrap.Modal(document.getElementById('modal-delete'));
    modalDelete.show();
}

function hapusMahasiswa() {
    const id = parseInt(document.getElementById('delete-id-to-remove').value);

    daftarMahasiswa = daftarMahasiswa.filter(mhs => mhs.id !== id);
    
    renderTabel();

    const modalDelete = bootstrap.Modal.getInstance(document.getElementById('modal-delete'));
    modalDelete.hide();
    alert('Data mahasiswa berhasil dihapus!');
}