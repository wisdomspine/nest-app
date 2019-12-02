import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import chalk = require('chalk');

@Injectable()
export class LoggerService {
    log(message: any){
        let time = new Date();
        const fileName =`${time.getDate()} ${time.getMonth()}, ${time.getFullYear()}`;
        const filePath = path.join('', 'logs', fileName+'.txt')
        const timeStamp= time.toISOString();

        this._log({file: filePath, time: time, message: message, force: true});
    }

    logException(message: any){
        
        let time = new Date();
        const fileName =`${time.getDate()} ${time.getMonth()}, ${time.getFullYear()}`;
        const filePath = path.join('', 'logs','exceptions', fileName+'.txt')
        const timeStamp= time.toISOString();
        this._log({file: filePath, time: time, message: message, force: true});        
    }

    private _log(data:{file:string, message: string, force?: boolean, time: string | number | Date}): void {
        data.force = data.force != undefined ? data.force : true;        
        data.time =  new Date(data.time).toISOString();

        fs.exists(data.file, (exists: boolean) => {
            let msg:string = data.time+"\n"+data.message+"\n\n";
            if(exists){
                fs.appendFile(data.file, msg, e => {
                })
            }else{
             if(data.force){
                fs.writeFile(data.file, msg, e => {});
             }  
            }
        })        
    }
}
