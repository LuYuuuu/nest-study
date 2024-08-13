// 先引入UploadedFile，UseInterceptors，FileInterceptor，FilesInterceptor，FileFieldsInterceptor 
import { Body, Controller, Get, Post, Render, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor,FileFieldsInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';


@Controller('study4')
export class Study4Controller {
    @Get()
    // http://localhost:3000/study4 默认显示study.ejs页面
    @Render('study.ejs')
    index() {
    }

    // 单个文件上传
    @Post('doAdd')
    @UseInterceptors(FileInterceptor('pic'))
    doAdd(@Body() body, @UploadedFile() file) {
        console.log('body :>> ', body);
        console.log('file :>> ', file);

        // join为拼接字符串
        // createWriteStream 创建可写入流
        var writeStream = createWriteStream(join(__dirname, '../../public/upload/', `${Date.now()}-${file.originalname}`))
        writeStream.write(file.buffer)

        return '上传成功'
    }

    // 多个文件上传
    @Post('doAdds')
    @UseInterceptors(FilesInterceptor('pic'))
    // 文件名不同这样写
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'pic1', maxCount: 1 },   // maxCount 最大文件数量
    //     { name: 'pic2', maxCount: 1 }
    // ]))
    doAdds(@Body() body, @UploadedFiles() files) {
        console.log('file :>> ', files);
        for(const file of files){
            var writeStream = createWriteStream(join(__dirname, '../../public/upload/', `${Date.now()}-${file.originalname}`))
            writeStream.write(file.buffer)
        }
        return '上传成功'
    }
}