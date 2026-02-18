#!/bin/bash
# Актуальные фото достопримечательностей: Wikimedia Commons (1–8) + Unsplash (9–20)
set -e
cd "$(dirname "$0")"
mkdir -p photos
BASE="https://upload.wikimedia.org/wikipedia/commons"

# 1–8: Wikimedia Commons (прямые URL файлов)
curl -L -s -o photos/1.jpg "$BASE/f/f7/Rock-Hewn_Churches%2C_Lalibela-107577.jpg"
curl -L -s -o photos/2.jpg "$BASE/7/76/The_North_Stelae_Park%2C_Axum%2C_Ethiopia_%282812686646%29.jpg"
curl -L -s -o photos/3.jpg "$BASE/7/79/Fasil_Ghebbi%2C_Gondar_Region-139580.jpg"
curl -L -s -o photos/4.jpg "$BASE/8/8c/Street_Scene_outside_Walls_of_Old_City_%28Jugal%29_-_Harar_-_Ethiopia_%288749426763%29.jpg"
curl -L -s -o photos/5.jpg "$BASE/7/7b/Simien_Mountains_Landscape%2C_Ethiopia_%282463662820%29.jpg"
# Озеро Тана — уменьшенная версия (оригинал ~100 МБ)
curl -L -s -o photos/6.jpg "$BASE/thumb/f/f4/Lake_Tana%2C_Ethiopia_2.jpg/1280px-Lake_Tana%2C_Ethiopia_2.jpg"
curl -L -s -o photos/7.jpg "$BASE/4/46/Blue_Nile_Falls_Ethiopia.jpg"
curl -L -s -o photos/8.jpg "$BASE/4/4e/Erta_Ale.jpg"

# 9–20: Unsplash (User-Agent для корректной выдачи)
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
curl -L -s -H "User-Agent: $UA" -o photos/9.jpg "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
# 10 — Долина Омо (Commons; Unsplash отдаёт ошибку)
curl -L -s -o photos/10.jpg "$BASE/thumb/d/d8/Omo_River_Valley_IMG_9923.jpg/1280px-Omo_River_Valley_IMG_9923.jpg"
curl -L -s -H "User-Agent: $UA" -o photos/11.jpg "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/12.jpg "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/13.jpg "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/14.jpg "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/15.jpg "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/16.jpg "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/17.jpg "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/18.jpg "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"
curl -L -s -H "User-Agent: $UA" -o photos/19.jpg "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800"
# 20 — Дыре-Дауа (Commons; Unsplash отдаёт ошибку)
curl -L -s -o photos/20.jpg "$BASE/thumb/2/26/Dire_Dawa%2C_Ethiopia_-_52026250628.jpg/1280px-Dire_Dawa%2C_Ethiopia_-_52026250628.jpg"

echo "Downloaded 20 photos to photos/"
