# https://stackoverflow.com/questions/42928765/convertnot-authorized-aaaa-error-constitute-c-readimage-453
# sed -i 's/<policy domain="coder" rights="none" pattern="PDF" \/>/<policy domain="coder" rights="read|write" pattern="PDF" \/>/g' /etc/ImageMagick-6/policy.xml

echo "[TEST_CASE] case_pdf"

echo "Compiling..."
patchouli
echo "Done!"

echo "Diffing..."
DIFF=$(compare \
  ./reference_build.pdf \
  ./build.pdf \
  -compose src \
  -metric AE \
  ./diff.pdf 2>&1)
echo "Done!"

if [ "$DIFF" == "0" ]
then
  echo "[TEST_CASE] OK"
  exit 0
else
  echo "[TEST_CASE] FAIL: $DIFF"
  exit 1
fi