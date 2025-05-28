import React from 'react'
import {Link, NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from 'shared/types';
import {zodResolver} from "@hookform/resolvers/zod";
import Navigation from "renderer/components/common/navigation";
import HeroContainer from "renderer/components/common/hero-container";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "renderer/components/ui/form";
import {Input} from "renderer/components/ui/input";
import {Button} from "renderer/components/ui/button";


const Login = () => {

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(data: LoginSchema) {
        console.log(data);
    }

    return (
        <div className={"h-screen"}>
            <Navigation/>
            <HeroContainer>
                <div>
                    <h1 className={"text-3xl font-bold mb-12 text-center"}>Welcome Back</h1>
                    <div className={"p-4"}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className={"w-[480px] flex flex-col gap-4"}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem className={""}>
                                            <FormLabel className={"text-lg font-light"}>Email</FormLabel>
                                            <FormControl>
                                                <Input className={"h-12"} placeholder="test@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className={"text-lg font-light"}>Password</FormLabel>
                                            <FormControl>
                                                <Input className={"h-12"} placeholder="password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className={"mt-4"}>Log in</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={"flex flex-col items-center gap-4 mt-12 text-sm"}>
                        <span className={"text-primary"}>Forgot password?</span>
                        <span>
                        <NavLink to={"/signup"}>
                            <span className={"text-primary"}>Don't have an account? Sign up</span>
                        </NavLink>
                    </span>
                    </div>
                </div>
            </HeroContainer>
        </div>
    )
}
export default Login
