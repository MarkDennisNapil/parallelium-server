const FTPClient = require('ftp');

function fileUpload(data){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      const client = new FTPClient();
    
      client.connect({
        host: 'files.000webhost.com',
        user: 'parallelium-server',
        password: 'Markdennisnapil@3182000'
      });
        client.on('ready', () => {
          const files = req.files.file; // Assuming your input field is named 'files'
    
        if (Array.isArray(files)) {
          // Handle multiple files
          files.forEach((file) => {
            const fileName = file.md5 + file.name;
            file.mv(`public_html/${fileName}`, (err) => {
              if (err) {
                console.error('Error moving files:', err);
                res.status(500).send('Error moving files.');
                client.end();
              } else {
                client.put(`public_html/${fileName}`, fileName, (ftpErr) => {
                  if (ftpErr) {
                    console.error('Error uploading file:', ftpErr);
                    res.status(500).send('Error uploading files.');
                  }
                });
              }
            });
          });
        } else {
          // Handle a single file
          const file = files;
          const fileName = file.md5 + file.name;
          file.mv(`public_html/${fileName}`, (err) => {
            if (err) {
              console.error('Error moving file:', err);
              res.status(500).send('Error moving files.');
              client.end();
            } else {
              client.put(`public_html/${fileName}`, fileName, (ftpErr) => {
                if (ftpErr) {
                  console.error('Error uploading file:', ftpErr);
                  res.status(500).send('Error uploading files.');
                }
              });
            }
          });
        }
        res.json({message: "Uploaded successfully!", files: files})
      });
    
      client.on('error', (err) => {
        console.error('FTP connection error:', err);
        res.status(500).send('FTP connection error.');
      });
}

module.exports  = fileUpload;