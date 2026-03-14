import subprocess
import sys

def run_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(e.stderr)
        return False

if __name__ == "__main__":
    if not run_command("npm run lint"):
        print("Linting failed.")
        sys.exit(1)

    if not run_command("npm run build"):
        print("Build failed.")
        sys.exit(1)

    print("Pre-commit checks passed successfully.")
