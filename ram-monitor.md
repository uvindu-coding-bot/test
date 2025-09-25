This code uses the `psutil` library to monitor RAM usage.  Make sure you have it installed (`pip install psutil`).  The code logs the RAM usage to a file, but you could easily adapt it to print to the console or use a different logging method.


```python
import psutil
import time
import logging

def ram_monitor(log_file="ram_usage.log", interval=5):
    """
    Monitors and logs RAM usage every specified interval.

    Args:
        log_file: Path to the log file.  Defaults to "ram_usage.log".
        interval: Logging interval in seconds. Defaults to 5 seconds.
    """

    # Configure logging
    logging.basicConfig(filename=log_file, level=logging.INFO, 
                        format='%(asctime)s - %(levelname)s - %(message)s')

    try:
        while True:
            mem = psutil.virtual_memory()
            # Log relevant RAM metrics.  Adjust as needed.
            logging.info(f"RAM Usage: Total: {mem.total / (1024 ** 3):.2f} GB, "
                         f"Available: {mem.available / (1024 ** 3):.2f} GB, "
                         f"Used: {mem.used / (1024 ** 3):.2f} GB, "
                         f"Percentage: {mem.percent}%")
            time.sleep(interval)
    except KeyboardInterrupt:
        logging.info("RAM monitoring stopped.")
    except Exception as e:
        logging.exception(f"An error occurred: {e}")


if __name__ == "__main__":
    ram_monitor()
```

To run this:

1.  **Save:** Save the code as a Python file (e.g., `ram_monitor.py`).
2.  **Run:** Execute it from your terminal: `python ram_monitor.py`
3.  **Check Log:**  The RAM usage will be logged to `ram_usage.log` in the same directory.  You can open this file to view the data.


To stop the monitoring, press `Ctrl+C` in the terminal.  The script will gracefully stop and log a message indicating this.  Error handling is included to catch and log any exceptions that might occur during monitoring.  You can customize the logging level, format, and the metrics logged as needed.
