#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
make_offline_zip.py
-------------------
Crée une archive ZIP "offline-ready" de l'application BlockPy@Col,
incluant les modèles IA (.pth) et les ressources nécessaires,
avec options pour inclure ou exclure certains dossiers volumineux.

Usage :
    python make_offline_zip.py
    python make_offline_zip.py --name BlockPy-Col-offline-v1.0
    python make_offline_zip.py --include-sources
    python make_offline_zip.py --exclude-sources
"""

import argparse
import shutil
import tempfile
import zipfile
from pathlib import Path


# -------------------------------------------------
# Configuration générale
# -------------------------------------------------

# Dossiers techniques toujours exclus
BASE_EXCLUDE_DIR_NAMES = {
    ".git",
    ".svn",
    ".hg",
    ".idea",
    ".vscode",
    "__pycache__",
    ".mypy_cache",
    ".pytest_cache",
    "venv",
    ".venv",
    "env",
    ".env",
    "build",
    "dist",
}

# Dossiers volumineux / pédagogiques optionnels
OPTIONAL_EXCLUDE_DIR_NAMES = {
    "sources",
    "_sources",
    "ds_download",
    "_ds_download",
    "_testDriss",
}

# Extensions de fichiers inutiles dans l’archive
EXCLUDE_FILE_EXTENSIONS = {
    ".pyc",
    ".pyo",
    ".log",
    ".tmp",
}


README_OFFLINE_TEXT = """\
UTILISATION DE BLOCKPY@COL (MODE HORS LIGNE)
===========================================

1. Décompression de l’archive
-----------------------------
Décompressez l’archive ZIP de préférence dans un dossier dont le chemin
ne contient PAS d’espace ni de caractères spéciaux.

Exemple recommandé :
    C:\\BlockPy-Col\\
    ou
    /home/utilisateur/BlockPy-Col/

Évitez par exemple :
    C:\\Users\\Nom Prénom\\Documents\\...


2. Lancement de l’application
-----------------------------
Ouvrez le fichier :

    index.html

à l’aide d’un navigateur récent :
    • Google Chrome
    • Mozilla Firefox

L’application BlockPy@Col se lance alors localement, sans connexion Internet.


3. Remarques importantes
------------------------
• Tous les modèles d’intelligence artificielle nécessaires (.pth)
  sont inclus dans cette archive.
• L’application est conçue pour fonctionner entièrement hors ligne.
• Aucun serveur distant n’est requis.


Auteur
------
Driss SOUDANI
"""


# -------------------------------------------------
# Fonctions utilitaires
# -------------------------------------------------

def should_exclude(path: Path, exclude_optional: bool) -> bool:
    """
    Détermine si un chemin doit être exclu de la copie.
    """
    for part in path.parts:
        if part in BASE_EXCLUDE_DIR_NAMES:
            return True
        if exclude_optional and part in OPTIONAL_EXCLUDE_DIR_NAMES:
            return True

    if path.is_file() and path.suffix.lower() in EXCLUDE_FILE_EXTENSIONS:
        return True

    return False


def copy_project(project_root: Path, temp_root: Path, exclude_optional: bool) -> Path:
    """
    Copie le projet dans un dossier temporaire en respectant les règles d’exclusion.
    """
    offline_root = temp_root / project_root.name
    offline_root.mkdir(parents=True, exist_ok=True)

    for src in project_root.rglob("*"):
        if should_exclude(src.relative_to(project_root), exclude_optional):
            continue

        dst = offline_root / src.relative_to(project_root)

        if src.is_dir():
            dst.mkdir(parents=True, exist_ok=True)
        else:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)

    return offline_root


def add_readme_offline(folder: Path):
    """
    Ajoute un fichier README_OFFLINE.txt dans le dossier offline.
    """
    readme_path = folder / "README_OFFLINE.txt"
    readme_path.write_text(README_OFFLINE_TEXT, encoding="utf-8")


def make_zip(folder: Path, zip_path: Path):
    """
    Crée l’archive ZIP finale.
    """
    zip_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for file in folder.rglob("*"):
            if file.is_file():
                zf.write(file, file.relative_to(folder))


# -------------------------------------------------
# Programme principal
# -------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Créer une archive ZIP offline-ready de BlockPy@Col"
    )
    parser.add_argument(
        "--name",
        default="BlockPy-Col-offline",
        help="Nom du fichier ZIP (sans extension)"
    )
    parser.add_argument(
        "--include-sources",
        action="store_true",
        help="Inclure les dossiers sources/_sources/ds_download/_ds_download/_testDriss"
    )
    parser.add_argument(
        "--exclude-sources",
        action="store_true",
        help="Exclure explicitement les dossiers sources/_sources/ds_download/_ds_download/_testDriss (par défaut)"
    )

    args = parser.parse_args()

    # Par défaut : on exclut les dossiers optionnels
    exclude_optional = not args.include_sources

    project_root = Path(__file__).resolve().parent
    output_dir = project_root / "dist"
    zip_path = output_dir / f"{args.name}.zip"

    with tempfile.TemporaryDirectory(prefix="offline_build_") as tmp:
        tmp_root = Path(tmp)
        offline_root = copy_project(project_root, tmp_root, exclude_optional)
        add_readme_offline(offline_root)
        make_zip(offline_root, zip_path)

    print(f"[OK] Archive offline prête : {zip_path}")


if __name__ == "__main__":
    main()
