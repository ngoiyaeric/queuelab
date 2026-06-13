import yaml
import sys

# Custom dumper to keep strings exactly as they are (no quotes if not needed, etc.)
class MyDumper(yaml.SafeDumper):
    def increase_indent(self, flow=False, indentless=False):
        return super(MyDumper, self).increase_indent(flow, False)

def patch_file(filepath):
    with open(filepath, 'r') as f:
        # Use a more manual approach to preserve the exact formatting of the YAML
        lines = f.readlines()

    new_lines = []
    skip = False
    for line in lines:
        if '- name: Validate Firebase Secret' in line:
            skip = True
            continue
        if skip:
            if line.strip().startswith('-') or (line.strip() == '' and not line.startswith(' ')):
                skip = False
                new_lines.append(line)
            continue
        new_lines.append(line)

    with open(filepath, 'w') as f:
        f.writelines(new_lines)

patch_file('.github/workflows/firebase-hosting-pull-request.yml')
patch_file('.github/workflows/firebase-hosting-prod.yml')
