import os
import json
import urllib.request
import datetime
from google import genai
from google.genai import types

STATE_FILE = 'docs/updates/state.json'
UPDATES_DIR = 'docs/updates'

def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    return {"behringer_firmware": None, "mixing_station": None}

def save_state(state):
    os.makedirs(UPDATES_DIR, exist_ok=True)
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=4)

def check_behringer_updates():
    # En un escenario real, haríamos un scrape de la web o consulta a la API de Music Tribe.
    # Por ahora, simularemos que encontramos una nueva actualización para demostración si no hay estado.
    return {
        "version": "4.10",
        "date": datetime.date.today().isoformat(),
        "notes": "- Fixed AES50 sync issues with DL16.\n- Added new routing options for Matrix 1-8.\n- GUI improvements for X-Live card."
    }

def synthesize_notes(version, raw_notes, source):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("GEMINI_API_KEY no encontrada. Generando resumen por defecto.")
        return f"## Notas de la versión {version}\n\n{raw_notes}\n\n*Impacto operativo, riesgos y módulos afectados omitidos por falta de API Key.*"
    
    client = genai.Client(api_key=api_key)
    prompt = f"""
    Eres un ingeniero de sonido FOH experto. Han publicado una actualización para el ecosistema Behringer X32.
    Fuente: {source}
    Versión: {version}
    Notas originales:
    {raw_notes}

    Por favor, genera un informe en Markdown con exactamente estas secciones:
    1. Resumen de Cambios en lenguaje claro.
    2. Impacto Operativo en directo (FOH / Monitores).
    3. Riesgos de Compatibilidad y Avisos (retrocompatibilidad de escenas, copias de seguridad en USB FAT32, stageboxes AES50).
    4. Módulos del Curso Afectados (señalando si impacta al Módulo 1, 2, 3, 4 o 5).
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
    )
    return response.text

def main():
    state = load_state()
    os.makedirs(UPDATES_DIR, exist_ok=True)
    
    # Check firmware updates
    latest_fw = check_behringer_updates()
    
    if latest_fw["version"] != state.get("behringer_firmware"):
        print(f"Nueva versión de firmware detectada: {latest_fw['version']}")
        summary = synthesize_notes(latest_fw['version'], latest_fw['notes'], "Firmware Behringer X32")
        
        filename = f"{UPDATES_DIR}/{datetime.date.today().isoformat()}-firmware-{latest_fw['version'].replace('.', '_')}.md"
        with open(filename, 'w') as f:
            f.write(f"# Actualización Firmware X32 v{latest_fw['version']}\n\n")
            f.write(summary)
            
        state["behringer_firmware"] = latest_fw["version"]
        save_state(state)
        print(f"Documento generado: {filename}")
    else:
        print("No hay nuevas versiones de firmware.")

if __name__ == '__main__':
    main()
