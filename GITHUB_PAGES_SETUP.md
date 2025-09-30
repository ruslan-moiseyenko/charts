# Инструкция по настройке GitHub Pages

## Шаг 1: Подготовка репозитория

1. Убедитесь, что ваш код находится в GitHub репозитории
2. Репозиторий должен быть публичным (или у вас должна быть подписка GitHub Pro)

## Шаг 2: Настройка Pages в GitHub

1. Перейдите в ваш репозиторий на GitHub
2. Нажмите на вкладку **Settings** (Настройки)
3. В левом меню найдите раздел **Pages**
4. В разделе **Source** выберите **Deploy from a branch**
5. В **Branch** выберите `gh-pages`
6. В **Folder** выберите `/ (root)`
7. Нажмите **Save**

## Шаг 3: Настройка прав доступа

1. Перейдите в **Settings** → **Actions** → **General**
2. В разделе **Workflow permissions** выберите:
   - **Read and write permissions**
   - Поставьте галочку **Allow GitHub Actions to create and approve pull requests**
3. Нажмите **Save**

## Шаг 4: Активация GitHub Actions

1. В репозитории перейдите на вкладку **Actions**
2. Если Actions отключены, нажмите **I understand my workflows, go ahead and enable them**
3. Дайте разрешение на запуск workflows

## Шаг 4: Первый деплой

1. Сделайте commit и push в ветку `main`:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. Перейдите в раздел **Actions** вашего репозитория
3. Дождитесь завершения workflow "Deploy to GitHub Pages"
4. После успешного завершения ваш сайт будет доступен по адресу:
   `https://ваш-username.github.io/charts/`

## Возможные проблемы

### Ошибка 404
- Проверьте настройки Pages (должна быть выбрана ветка `gh-pages`)
- Убедитесь, что workflow завершился успешно
- Подождите несколько минут - деплой может занять время

### Ошибка прав доступа (Permission denied)
- Перейдите в **Settings** → **Actions** → **General**
- В разделе **Workflow permissions** выберите **Read and write permissions**
- Поставьте галочку **Allow GitHub Actions to create and approve pull requests**
- Сохраните и перезапустите workflow

### Workflow не запускается
- Проверьте, что Actions включены в настройках репозитория
- Убедитесь, что файл `.github/workflows/deploy.yml` существует

### Проблемы с путями к ресурсам
- Проверьте, что `base` в `vite.config.ts` настроен правильно
- Убедитесь, что название репозитория соответствует пути в конфигурации

## Автоматическое обновление

После настройки каждый push в ветку `main` будет автоматически:
1. Запускать сборку проекта
2. Деплоить обновленную версию на GitHub Pages
3. Обновлять ваш сайт

Обычно обновление занимает 2-5 минут.
