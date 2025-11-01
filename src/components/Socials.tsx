import React from "react";
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si"
import PROFILE from "../lib/data"
import { Tooltip } from "react-tooltip";

function LinkButton({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
    return (
        <React.Fragment>
            <a href={href} target="_blank" rel="noreferrer"
                data-tooltip-id={title}
                data-tooltip-content={title}>
                {children}
            </a>
            <Tooltip id={title} place="bottom" className="text-xs bg-black/50 text-white rounded-md" />
        </React.Fragment>
    )
}

function Socials() {
    return (
        <div className="mt-4 flex gap-3">
            {PROFILE.github && <LinkButton href={PROFILE.github} title="GitHub"><SiGithub /></LinkButton>}
            {PROFILE.linkedin && <LinkButton href={PROFILE.linkedin} title="LinkedIn"><SiLinkedin /></LinkButton>}
            {PROFILE.instagram && <LinkButton href={PROFILE.instagram} title="Instagram"><SiInstagram /></LinkButton>}
            {PROFILE.twitter && <LinkButton href={PROFILE.twitter} title="Twitter"><SiX /></LinkButton>}
            {PROFILE.facebook && <LinkButton href={PROFILE.facebook} title="Facebook"><SiFacebook /></LinkButton>}
        </div>
    )
}

export default Socials