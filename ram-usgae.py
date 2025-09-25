```python
import psutil
import time

def ram_usage():
    while True:
        ram = psutil.virtual_memory()
        print(f"RAM usage: {ram.percent}%")
        time.sleep(5)

ram_usage()
```