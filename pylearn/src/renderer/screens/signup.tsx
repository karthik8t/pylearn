import React from 'react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";
import {signupSchema, SignupSchema} from 'shared/types';
import HeroContainer from "renderer/components/common/hero-container";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "renderer/components/ui/form";
import {Input} from "renderer/components/ui/input";
import {Button} from "renderer/components/ui/button";

const Signup = () => {

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "test@email.com",
            username: "ola",
            password: "Test@123"
        }
    });

    function onSubmit(data: SignupSchema) {
      console.debug(data);
        window.App.registerUser(data)
    }

    return (
        <div className={"h-full"}>
            <HeroContainer>
                <div>
                    <h1 className={"text-3xl font-bold mb-12 text-center"}>Sign up</h1>
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
                                    name="username"
                                    render={({field}) => (
                                        <FormItem className={""}>
                                            <FormLabel className={"text-lg font-light"}>Username</FormLabel>
                                            <FormControl>
                                                <Input className={"h-12"} placeholder="username" {...field} />
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
                                <Button type="submit" className={"mt-4"}>Sign Up</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={"flex flex-col items-center gap-4 mt-12 text-sm"}>
                        <span>
                        <Link to={"/login"}>
                            <span className={"text-primary"}>Already have an account? Login up</span>
                        </Link>
                    </span>
                    </div>
                </div>
            </HeroContainer>
        </div>
    )
}
export default Signup
