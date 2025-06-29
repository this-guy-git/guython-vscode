# run.py
import sys
import os
from guython.core.interpreter import GuythonInterpreter
from guython.core.constants import VERSION

def main():
    if len(sys.argv) < 2:
        print("Usage: python run.py <file.gy>")
        sys.exit(1)

    filename = sys.argv[1]

    if not filename.endswith(('.gy', '.guy')):
        print("Error: Only .gy or .guy files are allowed.")
        sys.exit(1)

    if not os.path.exists(filename):
        print(f"Error: File not found: {filename}")
        sys.exit(1)

    interpreter = GuythonInterpreter()
    with open(filename, 'r') as f:
        interpreter.run_program(f.readlines())
        interpreter.execute_remaining_loops()

if __name__ == '__main__':
    main()
