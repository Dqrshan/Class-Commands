import { ChatInputApplicationCommandData, Client, CommandInteraction, GuildMember, PermissionResolvable } from "discord.js";
export interface RunOptions {
    client: Client;
    interaction: CommandInteraction & {
        member: GuildMember;
    };
}
export declare type RunFunction = (options: RunOptions) => any;
export declare type CommandOptions = {
    permissions?: PermissionResolvable[];
    execute: RunFunction;
} & ChatInputApplicationCommandData;
export declare class Command {
    constructor(commandOptions: CommandOptions);
}
