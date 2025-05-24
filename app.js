new Vue({
  el: "#app",
  data: {
    form: {
      ad: '',
      soyad: '',
      email: '',
      cinsiyet: '',
      universite: '',
      telefon: '',
      mesaj: '',
      onay: false
    },
    error: ''
  },
  methods: {
    handleSubmit() {
      this.error = '';

      if (
        !this.form.ad ||
        !this.form.soyad ||
        !this.form.email ||
        !this.form.telefon ||
        !this.form.cinsiyet ||
        !this.form.universite ||
        !this.form.mesaj ||
        !this.form.onay
      ) {
        this.error = 'Lütfen tüm alanları doldurun ve onay kutusunu işaretleyin.';
        return;
      }

      if (!this.validateEmail(this.form.email)) {
        this.error = 'Geçerli bir e-posta adresi giriniz.';
        return;
      }

      const rawNumber = this.form.telefon.replace(/\D/g, '');
      if (rawNumber.length !== 11 || !rawNumber.startsWith('0')) {
        this.error = 'Telefon numarası 0 ile başlamalı ve toplam 11 haneli olmalıdır.';
        return;
      }

      let existing = JSON.parse(localStorage.getItem('formList')) || [];
      existing.push({ ...this.form });
      localStorage.setItem('formList', JSON.stringify(existing));
      window.location.href = 'result.html';
    },

    temizle() {
      this.form = {
        ad: '',
        soyad: '',
        email: '',
        telefon: '',
        cinsiyet: '',
        universite: '',
        mesaj: '',
        onay: false
      };
      this.error = '';
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    telefonFormatla() {
      let num = this.form.telefon.replace(/\D/g, '');
      if (num.length > 0 && num[0] !== '0') {
        num = '0' + num;
      }
      num = num.slice(0, 11);

      let formatted = '';
      if (num.length >= 1) formatted += num[0];
      if (num.length >= 2) formatted += '(' + num.slice(1, 4);
      if (num.length >= 4) formatted += ')';
      if (num.length >= 5) formatted += ' ' + num.slice(4, 7);
      if (num.length >= 8) formatted += '-' + num.slice(7, 9);
      if (num.length >= 10) formatted += '-' + num.slice(9, 11);

      this.form.telefon = formatted;
    }
  }
});
