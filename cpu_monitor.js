Several approaches exist to monitor CPU usage in Python.  Here are two versions: one using the `psutil` library (recommended for its cross-platform compatibility and ease of use), and another using the `os` module (less portable, requires more system-specific knowledge).

**Version 1: Using `psutil` (Recommended)**

This version is cleaner, more efficient, and works across different operating systems (Windows, macOS, Linux).  You'll need to install `psutil` first:  `pip install psutil`

```python
import psutil
import time
import logging

def cpu_monitor():
    """Logs CPU usage every 5 seconds."""

    # Configure logging
    logging.basicConfig(filename='cpu_usage.log', level=logging.INFO, 
                        format='%(asctime)s - %(levelname)s - %(message)s')

    while True:
        cpu_percent = psutil.cpu_percent(interval=None) # Get CPU usage
        logging.info(f"CPU usage: {cpu_percent}%")
        time.sleep(5)

if __name__ == "__main__":
    cpu_monitor()
```

This code logs CPU usage to a file named `cpu_usage.log`.  You can adjust the logging level or format as needed.


**Version 2: Using `os` (Less portable, more complex)**

This version uses the `os` module and is less portable. It's specifically designed for Linux systems using `/proc/stat`.  It's significantly more complex and less robust than using `psutil`.

```python
import os
import time
import logging

def cpu_monitor_os():
    """Logs CPU usage every 5 seconds (Linux-specific)."""

    logging.basicConfig(filename='cpu_usage.log', level=logging.INFO, 
                        format='%(asctime)s - %(levelname)s - %(message)s')

    prev_idle = 0
    prev_total = 0

    while True:
        with open('/proc/stat', 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line.startswith('cpu '):
                    cpu_stats = line.split()
                    idle = int(cpu_stats[4])
                    total = sum(map(int, cpu_stats[1:5]))
                    idle_diff = idle - prev_idle
                    total_diff = total - prev_total
                    cpu_percent = 100 * (total_diff - idle_diff) / total_diff if total_diff > 0 else 0
                    logging.info(f"CPU usage: {cpu_percent:.2f}%")
                    prev_idle = idle
                    prev_total = total
                    break  #Only process the first 'cpu ' line
        time.sleep(5)

if __name__ == "__main__":
    cpu_monitor_os()

```

Remember to use the `psutil` version unless you have a very specific reason to use the `os`-based method (and you're working exclusively on a Linux system).  The `psutil` approach is far superior in terms of portability, readability, and maintainability.  To stop either script, you'll need to manually interrupt it (e.g., using Ctrl+C).
