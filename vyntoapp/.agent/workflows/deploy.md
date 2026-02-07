---
description: Vynto App Web Sitesini Yayınlama (Deployment)
---

Bu çalışma alanı bir GitHub reposu (`Kaanska/kaansaka.github.io`) ile eşleştiği için en kolay yayınlama yöntemi **GitHub Pages** kullanmaktır.

### 1. Alan Adı Ayarları (Domain Provider)
Satın aldığınız domain sağlayıcısının panelinden (örneğin Turhost, IHS, vb.) şu DNS kayıtlarını yapmanız gerekir:

| Tip | İsim / Host | Değer / Hedef |
| :--- | :--- | :--- |
| **A** | @ | `185.199.108.153` |
| **A** | @ | `185.199.109.153` |
| **A** | @ | `185.199.110.153` |
| **A** | @ | `185.199.111.153` |
| **CNAME** | www | `kaanska.github.io` |

### 2. Kodları Gönderme
Değişiklikleri repoya gönderin:
```bash
git add .
git commit -m "Deploy: Vynto App official website"
git push origin main
```

### 3. GitHub Ayarları
1. GitHub reponuza gidin: `https://github.com/Kaanska/kaansaka.github.io`
2. **Settings > Pages** sekmesine tıklayın.
3. **Custom domain** kısmına `vyntoapp.com.tr` yazın ve Kaydedin.
4. **Enforce HTTPS** seçeneğini işaretleyin (DNS ayarlarından sonra aktif olacaktır).

Siteniz birkaç dakika içinde `vyntoapp.com.tr` üzerinden yayına girecektir.
