# 生成目錄結構
tree -I 'target|node_modules|.git' > project_structure.txt

# 或者更詳細的（包含檔案大小）
tree -I 'target|node_modules|.git' -h > project_structure.txt

# 只顯示到第 3 層
tree -L 3 -I 'target|node_modules|.git' > project_structure.txt