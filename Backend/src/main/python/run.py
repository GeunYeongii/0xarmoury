from app import app;

if not app.debug:   # debug=False 모드 일 때 Product Mode 전환 후 로그 기록
    import logging
    from logging.handlers import RotatingFileHandler  # logging 핸들러 이름
    file_handler = RotatingFileHandler(
        'dave_server.log', maxBytes=2000, backupCount=10)
        # './log/dave_server.log', maxBytes=2000, backupCount=10)
    file_handler.setLevel(logging.WARNING)
    app.logger.addHandler(file_handler)
    
if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000, debug=True)